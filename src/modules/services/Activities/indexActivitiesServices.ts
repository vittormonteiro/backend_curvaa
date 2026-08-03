import { notFound } from "../../../shared/errors/errorFactories";
import { repository, repositoryDependencies, entity } from '../../../shared/infra/typeorm/repositories/activitiesRepository';
import { assertWorkBelongsToLicense } from './activityScheduleRules';

interface IResponseDTO {
    _uuid: string;
    uuidlicenca: string;
}

export default class indexActivitiesServices {

    public async execute(_uuid:IResponseDTO): Promise<entity & { dependencias: string[] }> {

        const result = await repository.findOneBy(_uuid);

        if(!result){
            throw notFound();
        }

        await assertWorkBelongsToLicense(result.uuidobra, _uuid.uuidlicenca);

        const dependencies = await repositoryDependencies.findByActivity(result._uuid);

        return {
            ...result,
            dependencias: dependencies.map((dependency) => dependency.uuidatividade_dependente),
        };

    }

};
