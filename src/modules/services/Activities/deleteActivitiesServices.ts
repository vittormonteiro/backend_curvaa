import { conflict, notFound } from "../../../shared/errors/errorFactories";
import { repository, repositoryDependencies } from '../../../shared/infra/typeorm/repositories/activitiesRepository';
import { assertWorkBelongsToLicense } from './activityScheduleRules';

interface IRequestDTO{
  _uuid: string;
  uuidlicenca: string;
}

export default class deleteActivitiesServices {

  public async execute(object: IRequestDTO): Promise<void> {

    const result = await repository.findOneBy({ _uuid: object._uuid });

    if (!result) {
      throw notFound();
    }

    await assertWorkBelongsToLicense(result.uuidobra, object.uuidlicenca);

    const children = await repository.find({
      where: { uuidatividade_pai: object._uuid },
    });

    if (children.length) {
      throw conflict('Nao e possivel excluir atividade com sub-atividades.');
    }

    await repositoryDependencies.deleteByActivity(object._uuid);
    await repositoryDependencies.deleteByDependent(object._uuid);

    await repository.remove(result);
    
  }

};
