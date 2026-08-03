import nodemailer from 'nodemailer';
import HandleBarsEmailsTemplates from './handleBarsEmailsTemplates'
import { env } from '../env';

interface IMailContact {
    name:string,
    email:string
};

interface ITemplatesVariables{
    [key: string] : string | number;
};

interface IParserEmailTemplate {
    //Como teve a mudança no HANDRLEBARS EMAIL tenho que fazer a mudança aqui também
    file:string;
    variables:ITemplatesVariables
};

// Criando interfaze para email , passando to (Para quem , no caso o email) e body (Mensagem que vai apresentar no corpo do email)
interface SendEmail{
    to: IMailContact | IMailContact[];
    cc?: IMailContact | IMailContact[];
    from : IMailContact
    subject :string,
    templateData:IParserEmailTemplate,
    body?: string; // <--- novo campo
};

//criando cass EtherelMail.
export default class EtherealMail {
    //Função de Envio de Email no qual não tem retorno por isso esta promise Void
    static async sendMail({ to, cc, from, subject, templateData, body }: SendEmail): Promise<void> {

    const account = await nodemailer.createTestAccount();
    const mailTemplate = new HandleBarsEmailsTemplates();

    const htmlContent = body || (templateData ? await mailTemplate.parse(templateData) : '');
    const port = Number(env.MAIL_PORT) || account.smtp.port;
    const isSSL = port === 465;

    const transporter = nodemailer.createTransport({
        host: env.MAIL_HOST || account.smtp.host,
        port: port,
        secure: isSSL, 
        requireTLS: isSSL, 
        auth: {
            user: env.MAIL_USER || account.user,
            pass: env.MAIL_PASS || account.pass,
        },
        tls: {
            //minVersion: 'TLSv1.2',  // segurança moderna
            rejectUnauthorized: true,
        }
    });

    const recipients = Array.isArray(to)
        ? to.map(person => ({
            name: person.name,
            address: person.email
        }))
        : {
            name: to.name,
            address: to.email
        };

    let recipientsCC;

    if (cc) {
    recipientsCC = Array.isArray(cc)
        ? cc.map(person => ({
            name: person.name,
            address: person.email
        }))
        : {
            name: cc.name,
            address: cc.email
        };
    }

    const message = await transporter.sendMail({
        from: {
            name: from?.name || 'Equipe Regea',
            address: from?.email || env.MAIL_FROM_EMAIL,
        },
        to: recipients,
        cc: recipientsCC,
        subject,
        html: htmlContent,
    });

    if(nodemailer.getTestMessageUrl(message)){
        console.log('Message sent: %s', message.messageId);
    }

    }
};