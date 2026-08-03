import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/clientsRepository';

export default class showClientsServices {

    public async execute(): Promise<view[] | []> {

        return await repositoryView.find();
        
    };
    
};

