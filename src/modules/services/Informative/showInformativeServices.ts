import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/informativeRepository';

export default class showInformativeServices {
    
    public async execute(): Promise<view[]> {
      
        return await repositoryView.find();

    };

};
