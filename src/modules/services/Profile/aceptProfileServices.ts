import { notFound } from "../../../shared/errors/errorFactories";
import {repository} from '../../../shared/infra/typeorm/repositories/accessRepository';

interface IRequest{
    uuidusuario: string,
    termos_uso: boolean,
};

export default class aceptProfileServices {

    public async execute({uuidusuario, termos_uso} :IRequest): Promise<String>{

        const user = await repository.findOneBy({uuidusuario: uuidusuario});

        if(!user){
            throw notFound();
        }

        user.termos_uso = termos_uso;

        await repository.save(user);

        return "Atualizado com sucesso!";

    };

};
