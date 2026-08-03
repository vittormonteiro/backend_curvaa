import { notFound } from "../../../shared/errors/errorFactories";
import {repository} from '../../../shared/infra/typeorm/repositories/informativeRepository';

interface IRequestDTO{
  uuidcomunicado: string;
};

export default class deleteInformativeServices {

  public async execute(uuidcomunicado: IRequestDTO) : Promise<void> {

    const result = await repository.findOneBy(uuidcomunicado);

    if (!result) {
      throw notFound();
    }

    result.status = false;

    await repository.save(result);

  };

};