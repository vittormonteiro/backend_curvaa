import {compare, hash} from 'bcryptjs';
import {notFound, conflict} from "../../../shared/errors/errorFactories";
import {repository} from '../../../shared/infra/typeorm/repositories/accessRepository';

interface IRequest{
    uuidusuario: string,
    oldpass: string,
    newpass: string,
    renewpass: string,
};

export default class resetProfileServices {

    public async execute({uuidusuario, oldpass, newpass, renewpass} :IRequest): Promise<String>{

        const user = await repository.findOneBy({uuidusuario: uuidusuario}  );

        if(!user){
            throw notFound();
        }

        if(newpass !== renewpass){
            throw conflict('Senhas novas incorretas!.');
        }

        const checkPass = await compare(oldpass, user.senha)
  
        if (!checkPass){
            throw conflict('Senha antiga incorreta.');
        }

        user.senha = await hash(newpass,8);

        await repository.save(user);

        return "Atualizado com sucesso!";

    };

};
