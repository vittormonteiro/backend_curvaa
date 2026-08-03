import { notFound } from "../../../shared/errors/errorFactories";
import {repository, entity} from '../../../shared/infra/typeorm/repositories/clientsRepository';

interface IResponseDTO {
    uuidcliente: string;
};

export default class indexClientsServices {
    
    public async index(uuidcliente:IResponseDTO): Promise<entity> {

        const result = await repository.findOneBy(uuidcliente);

        if(!result){
            throw notFound();
        }

        return result;

    };

};

