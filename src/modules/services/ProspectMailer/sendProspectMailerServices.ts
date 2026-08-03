import EtherealMail from '../../../shared/config/mail/EtherealMail';
import path from 'path';
import {env} from './../../../shared/config/env';

interface IRequest {
  to: string[];
  subject: string;
  greeting: string;
  message: string;
  contact: string;
}

export default class sendProspectMailerServices {

  async execute({ to, subject, message, greeting, contact }: IRequest): Promise<any> {
    
    const alertTemplate = path.resolve(
      __dirname,
      'views',
      'template.hbs'
    );

    const recipients = to.map(email => ({
      name: email.split('@')[0],
      email
    }));

    return await EtherealMail.sendMail({
      to: recipients,
      cc: [
        { name: 'Marketing - Regea', email: 'marketing@regea.com.br' }
      ],
      //bcc: ['auditoria@email.com'],
      from: { name: 'Regea | Geologia, Engenharia e Estudos Ambientais', email: env.MAIL_FROM_EMAIL},
      subject,
      templateData: {
        file: alertTemplate,
        variables: {
          greeting,
          message,
          contact
        },
      },
    });

  }

}
