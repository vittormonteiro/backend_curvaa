import { badRequest, notFound } from "../../../shared/errors/errorFactories";
import {repository, repositoryView} from '../../../shared/infra/typeorm/repositories/prospectMailerRepository';
import SendProspectMailerServices from './sendProspectMailerServices';

export default class dispatcherProspectMailerServices {

  public async execute(): Promise<String> {

    const services = new SendProspectMailerServices();

    const result = await repositoryView.findByProspect('No aguardo', 'Licenciamento CETESB e gestão ambiental');

    if (!result) {
      return 'Sem emails de prospecção par serem enviados!';
    }

    try {

      const result2 = await repository.findOneBy({"_uuid": result._uuid});

      if (!result2) {
        throw notFound();
      }

      await services.execute({
        to: result.email?.split(';') || [],
        subject: result.titulo,
        message: result.descricao,
        greeting: result.saudacao,
        contact: result.contato  
      });

      result2.send_at = true;
      await repository.save(result2);

      return 'Email de prospecção enviados com sucesso!';

    } catch (error) {

      throw badRequest(error instanceof Error ? error.message : String(error));

    }

  };

};