import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/departmentsRepository';

export default class showDepartmentsServices {
    
    public async execute(): Promise<view[]> {
        
        return await repositoryView.find();

    };
    
};
