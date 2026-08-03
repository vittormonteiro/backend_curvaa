import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/informativeRepository';

interface IResponseDTO {
    status:boolean;
}

export default class readInformativeServices {

    public async execute({status}:IResponseDTO): Promise<view[]> {
        
        return await repositoryView.findByStatus(status);

    };

};
