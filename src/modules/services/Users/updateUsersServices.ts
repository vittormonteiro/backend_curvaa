import { hash } from "bcryptjs";
import { conflict, notFound } from "../../../shared/errors/errorFactories";
import { repository, entity } from '../../../shared/infra/typeorm/repositories/usersRepository';

export default class updateUsersServices {

  public async execute(object: entity): Promise<entity> {

    const uuidusuario = object.uuidusuario;
    const result = await repository.findOneBy({ uuidusuario });

    if (!result) {
      throw notFound();
    }

    object.cpf = String(object.cpf || '').replace(/[.\-/]/g, '');

    const cpfExists = await repository.findByCPF(object.cpf);
    if (cpfExists && cpfExists.uuidusuario !== uuidusuario) {
      throw conflict(`CPF ${object.cpf} ja existe.`);
    }

    const emailExists = await repository.findByEmail(object.email);
    if (emailExists && emailExists.uuidusuario !== uuidusuario) {
      throw conflict(`Email ${object.email} ja existe.`);
    }

    const loginExists = await repository.findByLogin(object.login);
    if (loginExists && loginExists.uuidusuario !== uuidusuario) {
      throw conflict(`Login ${object.login} ja existe.`);
    }

    const senha = object.senha ? await hash(object.senha, 8) : result.senha;

    return await repository.save({
      ...result,
      uuidlicenca: object.uuidlicenca || result.uuidlicenca,
      usuario: object.usuario.toUpperCase(),
      login: object.login,
      email: object.email,
      cpf: object.cpf,
      contato: object.contato,
      senha,
      status: object.status,
      termos_uso: object.termos_uso ?? result.termos_uso,
      user_at: object.user_at,
    });

  };

};
