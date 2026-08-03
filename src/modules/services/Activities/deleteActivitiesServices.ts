import { conflict, notFound } from "../../../shared/errors/errorFactories";
import { repository, repositoryDependencies } from '../../../shared/infra/typeorm/repositories/activitiesRepository';
import { assertWorkBelongsToLicense } from './activityScheduleRules';

interface IRequestDTO{
  _uuid: string;
  uuidlicenca: string;
}

export default class deleteActivitiesServices {

  public async execute(_uuid: IRequestDTO): Promise<void> {

    const result = await repository.findOneBy(_uuid);

    if (!result) {
      throw notFound();
    }

    await assertWorkBelongsToLicense(result.uuidobra, _uuid.uuidlicenca);

    const children = await repository.find({
      where: { uuidatividade_pai: _uuid._uuid },
    });

    if (children.length) {
      throw conflict('Nao e possivel excluir atividade com sub-atividades.');
    }

    await repositoryDependencies.deleteByActivity(_uuid._uuid);
    await repositoryDependencies.deleteByDependent(_uuid._uuid);

    await repository.remove(result);
    
  }

};
