import { notFound } from "../../../shared/errors/errorFactories";
import { repository, repositoryDependencies, entity } from '../../../shared/infra/typeorm/repositories/activitiesRepository';

interface IResponseDTO {
    _uuid: string;
}

export default class indexActivitiesServices {

    public async execute(_uuid:IResponseDTO): Promise<entity & { dependencias: string[] }> {

        const result = await repository.findOneBy(_uuid);

        if(!result){
            throw notFound();
        }

        const dependencies = await repositoryDependencies.findByActivity(result._uuid);

        return {
            ...result,
            dependencias: dependencies.map((dependency) => dependency.uuidatividade_dependente),
        };

    }

};
