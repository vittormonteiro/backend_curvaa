import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/departmentsRepository';

interface IResponseDTO {
    status: string;
};

export default class readDepartmentsServices {

    public async execute({status}:IResponseDTO): Promise<view[]> {
        
        return await repositoryView.findByStatus(status);

    };

};
