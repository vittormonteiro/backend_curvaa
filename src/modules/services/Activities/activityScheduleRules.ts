import { badRequest, conflict, notFound } from "../../../shared/errors/errorFactories";
import { repository, repositoryDependencies, entity } from "../../../shared/infra/typeorm/repositories/activitiesRepository";
import { repositoryView as worksRepositoryView } from "../../../shared/infra/typeorm/repositories/worksRepository";

export interface IActivityPayload extends Partial<entity> {
  _uuid?: string;
  uuidlicenca?: string;
  dependencias?: string[];
}

const normalizeDependencies = (dependencias?: string[]): string[] => {
  return [...new Set((dependencias || []).filter(Boolean))];
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const toDate = (date?: Date | string | null): Date | null => {
  if (!date) {
    return null;
  }

  const result = new Date(date);
  return Number.isNaN(result.getTime()) ? null : result;
};

const getActivityEnd = (activity: Partial<entity>): Date | null => {
  const end = toDate(activity.dt_fim);

  if (end) {
    return end;
  }

  const start = toDate(activity.dt_inicio);

  if (!start || !activity.tempo) {
    return null;
  }

  return addDays(start, Number(activity.tempo));
};

const validateParent = async (object: IActivityPayload): Promise<void> => {
  if (!object.uuidatividade_pai) {
    return;
  }

  if (object.uuidatividade_pai === object._uuid) {
    throw conflict('A atividade nao pode ser pai dela mesma.');
  }

  const parent = await repository.findOneBy({ _uuid: object.uuidatividade_pai });

  if (!parent || parent.uuidobra !== object.uuidobra) {
    throw notFound('Atividade pai nao encontrada para esta obra.');
  }

  let currentParentUuid = parent.uuidatividade_pai;

  while (currentParentUuid) {
    if (currentParentUuid === object._uuid) {
      throw conflict('A hierarquia da atividade gera um ciclo.');
    }

    const currentParent = await repository.findOneBy({ _uuid: currentParentUuid });
    currentParentUuid = currentParent?.uuidatividade_pai || null;
  }

  const start = toDate(object.dt_inicio);
  const end = getActivityEnd(object);
  const parentStart = toDate(parent.dt_inicio);
  const parentEnd = getActivityEnd(parent);

  if (start && end && parentStart && parentEnd && (start < parentStart || end > parentEnd)) {
    throw conflict('Sub-atividade deve ficar dentro do periodo da atividade pai.');
  }
};

const validateDependencies = async (object: IActivityPayload, dependencies: string[]): Promise<void> => {
  if (!dependencies.length) {
    return;
  }

  if (dependencies.some((dependency) => dependency === object._uuid)) {
    throw conflict('A atividade nao pode depender dela mesma.');
  }

  const activities = await repository.find({
    where: dependencies.map((_uuid) => ({ _uuid })),
  });

  if (activities.length !== dependencies.length || activities.some((activity) => activity.uuidobra !== object.uuidobra)) {
    throw notFound('Dependencia nao encontrada para esta obra.');
  }

  const start = toDate(object.dt_inicio);

  if (start) {
    activities.forEach((activity) => {
      const dependencyEnd = getActivityEnd(activity);

      if (dependencyEnd && start < dependencyEnd) {
        throw conflict('A atividade so pode iniciar depois do termino das dependencias.');
      }
    });
  }

  if (!object._uuid) {
    return;
  }

  const allDependencies = await repositoryDependencies.find();
  const graph = new Map<string, string[]>();

  allDependencies.forEach((dependency) => {
    if (dependency.uuidatividade !== object._uuid) {
      graph.set(dependency.uuidatividade, [
        ...(graph.get(dependency.uuidatividade) || []),
        dependency.uuidatividade_dependente,
      ]);
    }
  });

  graph.set(object._uuid, dependencies);

  const hasPathToActivity = (uuidatividade: string, visited = new Set<string>()): boolean => {
    if (uuidatividade === object._uuid) {
      return true;
    }

    if (visited.has(uuidatividade)) {
      return false;
    }

    visited.add(uuidatividade);

    return (graph.get(uuidatividade) || []).some((dependency) => hasPathToActivity(dependency, visited));
  };

  if (dependencies.some((dependency) => hasPathToActivity(dependency))) {
    throw conflict('As dependencias geram um ciclo no cronograma.');
  }
};

export const validateActivitySchedule = async (object: IActivityPayload): Promise<string[]> => {
  if (!object.uuidobra) {
    throw badRequest('Obra obrigatoria.');
  }

  if (!object.dt_inicio) {
    throw badRequest('Data de inicio obrigatoria.');
  }

  if (!object.tempo || Number(object.tempo) <= 0) {
    throw badRequest('Tempo deve ser maior que zero.');
  }

  const work = await worksRepositoryView.findByUUID(object.uuidobra);

  if (!work || (object.uuidlicenca && work.uuidlicenca !== object.uuidlicenca)) {
    throw notFound('Obra nao encontrada para esta licenca.');
  }

  const start = toDate(object.dt_inicio);
  const end = getActivityEnd(object);

  if (start && end && end < start) {
    throw conflict('Data final nao pode ser anterior ao inicio.');
  }

  const dependencies = normalizeDependencies(object.dependencias);

  await validateParent(object);
  await validateDependencies(object, dependencies);

  return dependencies;
};

export const syncActivityDependencies = async (uuidatividade: string, dependencies: string[], user_at: string): Promise<void> => {
  await repositoryDependencies.deleteByActivity(uuidatividade);

  const entities = dependencies.map((uuidatividade_dependente) => repositoryDependencies.create({
    uuidatividade,
    uuidatividade_dependente,
    tipo: 'FIM_INICIO',
    user_at,
  }));

  if (entities.length) {
    await repositoryDependencies.save(entities);
  }
};
