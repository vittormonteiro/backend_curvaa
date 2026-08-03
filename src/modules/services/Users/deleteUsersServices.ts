import { notFound } from "../../../shared/errors/errorFactories";
import {repository} from '../../../shared/infra/typeorm/repositories/usersRepository';

interface IResponseDTO{
    uuidusuario: string;
};

export default class deleteUsersServices {

    public async execute(uuidusuario:IResponseDTO): Promise<void>{

        const result = await repository.findOneBy(uuidusuario);

        if (!result){
            throw notFound();
        }

        result.status = 'Desativado';

        await repository.save(result);

    };

};
