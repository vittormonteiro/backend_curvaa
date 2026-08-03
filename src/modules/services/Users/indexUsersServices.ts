import { notFound } from "../../../shared/errors/errorFactories";
import {repository, entity} from '../../../shared/infra/typeorm/repositories/usersRepository';

interface IResponseDTO{
    uuidusuario: string;
};

export default class indexUsersServices {

    public async execute(uuidusuario:IResponseDTO): Promise <entity>{

        const result = await repository.findOneBy(uuidusuario);

        if (!result){
            throw notFound()
        }

        return result;

    };

};

