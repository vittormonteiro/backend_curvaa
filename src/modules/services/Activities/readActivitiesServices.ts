import { repository, repositoryDependencies, repositoryView, view } from '../../../shared/infra/typeorm/repositories/activitiesRepository';

interface IResponseDTO {
    status:boolean | string;
    uuidobra:string;
    uuidlicenca:string;
}

export default class readActivitiesServices {

    public async execute ({status, uuidobra, uuidlicenca}:IResponseDTO): Promise<Array<view & { uuidatividade_pai?: string | null; dependencias?: string[] }>> {
        
        if (!uuidobra) {
            return await repositoryView.findByStatusAndLincense(String(status), uuidlicenca);
        }

        const activitiesView = await repositoryView.findByWorks(uuidobra, uuidlicenca);
        const activities = await repository.find({
            where: { uuidobra },
        });
        const dependencies = await repositoryDependencies.find();
        const activityMap = new Map(activities.map((activity) => [activity._uuid, activity]));

        return activitiesView.map((activity) => ({
            ...activity,
            uuidatividade_pai: activityMap.get(activity._uuid)?.uuidatividade_pai || null,
            dependencias: dependencies
                .filter((dependency) => dependency.uuidatividade === activity._uuid)
                .map((dependency) => dependency.uuidatividade_dependente),
        }));

    }
    
};
