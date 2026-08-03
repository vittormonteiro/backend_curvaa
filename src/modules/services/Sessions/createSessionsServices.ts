import { forbidden } from "../../../shared/errors/errorFactories";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from "../../../shared/config/auth";
import { repository } from '../../../shared/infra/typeorm/repositories/accessRepository';

interface IRequestDTO {
  login: string;
  senha: string;
};

const MAX_LOGIN_ATTEMPTS = 3;

export default class createSessionsServices {

  public async execute({ login, senha }: IRequestDTO): Promise<String> {

    const user = await repository.findByLoginOrEmail(login);

    if (!user) {
      throw forbidden('Login incorreto ou nao existe.');
    }

    if (user.access_locked_at) {
      throw forbidden('Acesso bloqueado por tentativas invalidas. Recupere sua senha para liberar o acesso.');
    }

    const passwordCheck = await compare(senha, user.senha);
    if (!passwordCheck) {

      user.login_attempts = Number(user.login_attempts || 0) + 1;

      if (user.login_attempts > MAX_LOGIN_ATTEMPTS) {
        user.access_locked_at = new Date();
        user.token_at = "";
        await repository.save(user);
        throw forbidden('Acesso bloqueado por tentativas invalidas. Recupere sua senha para liberar o acesso.');
      }

      await repository.save(user);

      throw forbidden(`Senha incorreta. Voce tem mais ${MAX_LOGIN_ATTEMPTS - user.login_attempts + 1} tentativa(s)!`);
    }

    if (user.status == 'Desativado') {
      throw forbidden('Usuario desativado.');
    }

    const token = sign(
      {
        termsuse: user.termos_uso,
        changepass: senha === 'trocardesenha' ? false : true,
      },
      authConfig.jwt.secret,
      {
        subject: user.uuidusuario,
        audience: user.uuidlicenca,
        expiresIn: authConfig.jwt.expireIn,
      });

    user.token_at = token;
    user.last_log = new Date();
    user.login_attempts = 0;
    user.access_locked_at = null;

    await repository.save(user);

    return token;

  };

};
