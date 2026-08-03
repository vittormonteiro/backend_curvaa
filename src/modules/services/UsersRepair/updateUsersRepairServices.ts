import {hash} from "bcryptjs";
import {notFound, conflict, badRequest, forbidden} from "../../../shared/errors/errorFactories";
import {repository as usersRepairRepository} from "../../../shared/infra/typeorm/repositories/usersRepairRepository";
import {repository as accessRepository} from "../../../shared/infra/typeorm/repositories/accessRepository";

export default class updateUsersRepairServices {

  public async execute(object: any): Promise<String>  {

    const result = await usersRepairRepository.findOneBy({_uuid: object.token});

    if (!result) {
      throw conflict('Link de recuperação de senha inválido. Por favor, solicite um novo link.');
    }

    // Verifica se o link de recuperação de senha ainda é válido (1 hora)
    if (result.created_at < new Date(Date.now() - 3600000)) {
      throw forbidden('Link de recuperação de senha expirado. Por favor, solicite um novo link.');
    }

    const uuidusuario = result.uuidusuario;

    const user = await accessRepository.findOneBy({uuidusuario});

    if (!user) {
      throw notFound('Usuário não encontrado.');
    }

    try {

      user.senha = await hash(object.password, 8);
      user.login_attempts = 0;
      user.access_locked_at = null;
      user.token_at = "";

      await accessRepository.save(user);

      await usersRepairRepository.delete(result._uuid);

      return "Senha atualizada com sucesso!";
      
    } catch (error) {

      const message = error instanceof Error ? error.message : String(error);
      throw badRequest(message);
    
    };
    
  };

};

