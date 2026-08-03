import { notFound } from "../../../shared/errors/errorFactories";
import {repository, entity} from '../../../shared/infra/typeorm/repositories/daysRepository';


interface IResponseDTO {
    uuiddiasuteis: string;
};

export default class indexDaysServices {

    public async execute(uuiddiasuteis:IResponseDTO): Promise<entity> {

        const result = await repository.findOneBy(uuiddiasuteis);

        if(!result){
            throw notFound();
        }

        return result;
        
    };

};
