import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/permissionsRepository';

export default class showPermissionsServices {

    public async execute(): Promise<view[]> {
        
        return await repositoryView.find();

    }
    
};

