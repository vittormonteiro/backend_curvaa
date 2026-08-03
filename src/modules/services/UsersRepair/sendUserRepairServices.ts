import EtherealMail from '../../../shared/config/mail/EtherealMail';
import path from 'path';
import {env} from '../../../shared/config/env';

interface IRequest {
  to: string[];
  subject: string;
  message: string;
}

export default class sendUserRepairServices {

  async execute({ to, subject, message }: IRequest): Promise<any> {
    
    const alertTemplate = path.resolve(
      __dirname,
      'views',
      'forgot_password_template.hbs'
    );

    const recipients = to.map(email => ({
      name: email.split('@')[0],
      email
    }));

    return await EtherealMail.sendMail({
      to: recipients,
      cc: { name: "CurvaA", email: "suporte@regea.com.br"},
      from: { name: env.MAIL_FROM_NAME, email: env.MAIL_FROM_EMAIL},
      subject,
      templateData: {
        file: alertTemplate,
        variables: {
          message,
        },
      },
    });

  }

}
