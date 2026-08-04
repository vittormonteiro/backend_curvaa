import { notFound } from "../../../shared/errors/errorFactories";
import { repositoryView as worksRepositoryView } from "../../../shared/infra/typeorm/repositories/worksRepository";

export const assertDiaryWorkBelongsToLicense = async (uuidobra: string, uuidlicenca?: string): Promise<void> => {
  const work = await worksRepositoryView.findByUUID(uuidobra);

  if (!work || (uuidlicenca && work.uuidlicenca !== uuidlicenca)) {
    throw notFound('Obra nao encontrada para esta licenca.');
  }
};
