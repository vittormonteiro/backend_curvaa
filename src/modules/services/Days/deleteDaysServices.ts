import { notFound } from "../../../shared/errors/errorFactories";
import {repository} from '../../../shared/infra/typeorm/repositories/daysRepository';

interface IRequestDTO{
  uuiddiasuteis: string;
};

export default class deleteDaysServices {

  public async execute(uuiddiasuteis: IRequestDTO) : Promise<void> {

    const result = await repository.findOneBy(uuiddiasuteis);

    if (!result) {
      throw notFound();
    }

    await repository.remove(result);
    
  };

};
