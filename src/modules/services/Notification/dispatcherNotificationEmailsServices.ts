import { notFound, badRequest } from "../../../shared/errors/errorFactories";
import {repository, entity} from '../../../shared/infra/typeorm/repositories/notificationRepository';
import {repositoryView as notificationEmailRepositoryView} from '../../../shared/infra/typeorm/repositories/notificationEmailRepository';
import SendNotificationEmailsServices from '../Alerts/SendEmailAlertServices'

export default class dispatcherNotificationEmailsServices {

  public async execute(): Promise<String> {

    const services = new SendNotificationEmailsServices();

    try {

      const result = await notificationEmailRepositoryView.findByStatus('No aguardo');

      for (const item of result) {

        await services.execute({
          to: item.email?.split(';') || [],
          subject: item.titulo,
          message: item.descricao
        });

        const result2 = await repository.findOneBy({uuidnotific: item.uuidnotific});

        if (!result2) {
          throw notFound();
        }

        result2.send_at = true;
        await repository.save(result2);

      } 

      return 'Emails de notificação enviados com sucesso!';

    } catch (error) {

      const message = error instanceof Error ? error.message : String(error);
      throw badRequest(message);
    }

  };

};