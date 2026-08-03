import { notFound } from "../../../shared/errors/errorFactories";
import {repository} from '../../../shared/infra/typeorm/repositories/accessRepository';

interface IRequestDTO {
  uuidusuario: string; 
};

export default class createSessionsServices {

    public async execute(uuidusuario: IRequestDTO): Promise<String> {

      const user = await repository.findOneBy(uuidusuario);

      if (!user) {
        throw notFound();
      }

      user.token_at = '';
      user.last_log = new Date();

      await repository.save(user);

      return 'Deslogado com sucesso!';

    };

};
