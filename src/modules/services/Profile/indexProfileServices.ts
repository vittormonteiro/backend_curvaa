import { notFound } from "../../../shared/errors/errorFactories";
import {entity, repository} from '../../../shared/infra/typeorm/repositories/usersRepository';

interface IRequest{
    uuidusuario: string;
};

export default class indexProfileServices {

    public async execute({uuidusuario}:IRequest): Promise<entity>{


        const result = await repository.findOneBy({uuidusuario: uuidusuario});

        if(!result){
            throw notFound();
        }

        return result;

    };

};
