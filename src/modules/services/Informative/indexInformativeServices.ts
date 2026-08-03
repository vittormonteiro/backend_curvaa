import { notFound } from "../../../shared/errors/errorFactories";
import {repository,entity} from '../../../shared/infra/typeorm/repositories/informativeRepository';

interface IResponseDTO {
    uuidcomunicado: string;
};

export default class indexInformativeServices {

    public async execute(uuidcomunicado:IResponseDTO): Promise<entity> {

        const result = await repository.findOneBy(uuidcomunicado);

        if(!result){
            throw notFound();
        }

        return result;
        
    };

};
