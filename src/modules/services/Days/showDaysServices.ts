import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/daysRepository';

export default class showDaysServices {

    public async execute(): Promise<view[]> {
        
        return await repositoryView.find();

    };

};
