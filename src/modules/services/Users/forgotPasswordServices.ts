import { notFound } from "../../../shared/errors/errorFactories";
import {repository} from '../../../shared/infra/typeorm/repositories/usersRepository';
import CreateSessionsServices from "../Sessions/createSessionsServices"
import EtherelMail from '../../../shared/config/mail/EtherealMail';
import path from 'path';
import { env } from "../../../shared/config/env";

interface IRequestDTO {
    email: string;
}

export default class ForgotPasswordServices {

  public async execute({email}: IRequestDTO): Promise<void> {

    const user = await repository.findByEmail(email);

    if(!user){
      throw notFound(`Email ${email} não existe.`)
    }

    const createSessionsServices = new CreateSessionsServices();

    const login = user.login;
    const senha = 'trocardesenha';

    const token  = await createSessionsServices.execute({login, senha});

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'Users','views','forgot_password.hbs')

    await EtherelMail.sendMail({
      to:{
        name: user.usuario,
        email: user.email
      },
      from: {
        name :'Equipe Regea',
        email:'suporte_regea@uol.com.br'
      },

      subject: '[Equipe Regea] Recuperação de Senha ',

    templateData:{

      //Estou passando a variavel que conta o arquivo HTML
      file : forgotPasswordTemplate,
      //Aqui estou passando o nome do usuario e qual url vai o token para o usuario fazer o reset da senha 
      variables :{
        name:   user.usuario,
        link : `http://${env.HOST}/reset_password?token=${token}`,
      },

    } ,

    });

  }
  
};
