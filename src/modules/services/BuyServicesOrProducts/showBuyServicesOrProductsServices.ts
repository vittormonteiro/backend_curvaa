import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/buyServicesProductsRepository';

export default class showBuyServicesOrProductsServices {

    public async execute(): Promise<view[]> {

        return await repositoryView.find();
        
    };
    
};