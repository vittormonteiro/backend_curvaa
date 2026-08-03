import { hash } from "bcryptjs";
import { v4 as uuid } from 'uuid';
import { conflict } from "../../../shared/errors/errorFactories";
import { repository, entity } from '../../../shared/infra/typeorm/repositories/usersRepository';

export default class createUsersServices {

  public async execute(object: entity): Promise<entity> {

    object.cpf = String(object.cpf || '').replace(/[.\-/]/g, '');

    if (await repository.findByCPF(object.cpf)) {
      throw conflict(`CPF ${object.cpf} ja existe.`);
    }

    if (await repository.findByEmail(object.email)) {
      throw conflict(`Email ${object.email} ja existe.`);
    }

    if (await repository.findByLogin(object.login)) {
      throw conflict(`Login ${object.login} ja existe.`);
    }

    object.uuidusuario = object.uuidusuario || uuid();
    object.usuario = object.usuario.toUpperCase();
    object.status = object.status || 'Ativo';
    object.senha = await hash(object.senha || 'trocardesenha', 8);
    object.termos_uso = object.termos_uso || false;
    object.token_at = '';
    object.login_attempts = 0;
    object.access_locked_at = null;

    const result = repository.create(object);

    return await repository.save(result);

  };

};
