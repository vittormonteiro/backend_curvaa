import { conflict } from "../../../shared/errors/errorFactories";
import { repository, repositoryDependencies, entity } from '../../../shared/infra/typeorm/repositories/activitiesRepository';
import { IActivityPayload, syncActivityDependencies, validateActivitySchedule } from './activityScheduleRules';

interface IImportActivityPayload extends IActivityPayload {
  atividade_pai_ref?: string | null;
  dependencias_ref?: string[];
}

interface IRequestDTO {
  uuidobra: string;
  uuidlicenca: string;
  user_at: string;
  activities: IImportActivityPayload[];
}

interface IImportResponse {
  created: number;
  updated: number;
  ignored: number;
  activities: entity[];
}

const getActivityLabel = (activity: Partial<entity>): string => {
  return `${activity.etapa} - ${activity.atividade}`;
};

const addActivityReferences = (referenceMap: Map<string, string>, activity: Partial<entity>): void => {
  if (activity._uuid) {
    referenceMap.set(activity._uuid, activity._uuid);
  }

  if (activity.etapa) {
    referenceMap.set(String(activity.etapa), activity._uuid as string);
  }

  referenceMap.set(getActivityLabel(activity), activity._uuid as string);
};

export default class importActivitiesServices {

  public async execute({ uuidobra, uuidlicenca, user_at, activities }: IRequestDTO): Promise<IImportResponse> {

    const existingActivities = await repository.find({
      where: { uuidobra },
    });
    const referenceMap = new Map<string, string>();

    existingActivities.forEach((activity) => addActivityReferences(referenceMap, activity));
    const imported: Array<{ payload: IImportActivityPayload; saved: entity }> = [];
    let created = 0;
    let updated = 0;
    let ignored = 0;

    for (const activity of activities) {
      if (!activity.atividade || !activity.dt_inicio) {
        ignored++;
        continue;
      }

      const current = activity._uuid ? await repository.findOneBy({ _uuid: activity._uuid }) : null;

      if (activity._uuid && (!current || current.uuidobra !== uuidobra)) {
        throw conflict(`Atividade ${activity._uuid} nao pertence a esta obra.`);
      }

      const payloadData = {
        ...(current || {}),
        ...activity,
        uuidobra,
        uuidatividade_pai: current?.uuidatividade_pai || null,
        user_at,
      };

      if (current?._uuid || activity._uuid) {
        payloadData._uuid = current?._uuid || activity._uuid;
      }

      const payload = repository.create(payloadData);

      const currentDependencies = current ? await repositoryDependencies.findByActivity(current._uuid) : [];
      await validateActivitySchedule({
        ...payload,
        dependencias: currentDependencies.map((dependency) => dependency.uuidatividade_dependente),
        uuidlicenca,
      });
      const saved = await repository.save(payload);

      addActivityReferences(referenceMap, saved);
      imported.push({ payload: activity, saved });

      if (current) {
        updated++;
      } else {
        created++;
      }
    }

    for (const item of imported) {
      const shouldUpdateRelations =
        item.payload.uuidatividade_pai !== undefined ||
        item.payload.atividade_pai_ref !== undefined ||
        item.payload.dependencias !== undefined ||
        item.payload.dependencias_ref !== undefined;

      if (!shouldUpdateRelations) {
        continue;
      }

      const parentUuid = item.payload.uuidatividade_pai !== undefined ?
        item.payload.uuidatividade_pai :
        (item.payload.atividade_pai_ref ? referenceMap.get(item.payload.atividade_pai_ref) : null);
      const dependencyUuids = [
        ...(item.payload.dependencias || []),
        ...((item.payload.dependencias_ref || []).map((reference) => referenceMap.get(reference)).filter(Boolean) as string[]),
      ];

      const payload = repository.create({
        ...item.saved,
        uuidatividade_pai: parentUuid || null,
      });
      const dependencies = await validateActivitySchedule({
        ...payload,
        dependencias: dependencyUuids,
        uuidlicenca,
      });

      const saved = await repository.save(payload);
      await syncActivityDependencies(saved._uuid, dependencies, user_at);
      item.saved = saved;
    }

    return {
      created,
      updated,
      ignored,
      activities: imported.map((item) => item.saved),
    };

  };

};
