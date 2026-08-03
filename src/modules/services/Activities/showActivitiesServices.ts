import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/activitiesRepository';

export default class showActivitiesServices {
    
    public async execute(): Promise<view[]> {

        return await repositoryView.find();

    }

};

