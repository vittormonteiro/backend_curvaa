import { notFound } from "../../../shared/errors/errorFactories";
import {repository} from '../../../shared/infra/typeorm/repositories/clientsRepository';


interface IRequestDTO{
  uuidcliente: string;
};

export default class deleteClientsServices {

  public async execute(uuidcliente: IRequestDTO) : Promise<void> {

    const result = await repository.findOneBy(uuidcliente);

    if (!result) {
      throw notFound();
    }

    result.status = false;

    await repository.save(result);
    
  };
  
};
