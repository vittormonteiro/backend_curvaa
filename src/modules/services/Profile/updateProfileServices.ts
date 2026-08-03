import { conflict, notFound } from "../../../shared/errors/errorFactories";
import { entity, repository } from '../../../shared/infra/typeorm/repositories/usersRepository';

export default class updateProfileServices {

  public async execute(object: entity): Promise<entity> {

    const uuidusuario = object.uuidusuario;
    const content = await repository.findOneBy({ uuidusuario });

    if (!content) {
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

    return await repository.save({
      ...content,
      usuario: object.usuario.toUpperCase(),
      login: object.login,
      email: object.email,
      contato: object.contato,
      cpf: object.cpf,
      termos_uso: object.termos_uso,
      user_at: uuidusuario,
    });

  };

};
