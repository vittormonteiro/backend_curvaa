import { notFound } from "../../../shared/errors/errorFactories";
import {repository} from '../../../shared/infra/typeorm/repositories/departmentsRepository';

interface IRequestDTO{
  uuiddeparta: string;
};

export default class deleteDepartmentsServices {

  public async execute(uuiddeparta: IRequestDTO) : Promise<void> {

    const result = await repository.findOneBy(uuiddeparta);

    if (!result) {
      throw notFound();
    }

    result.status = false;
      
    await repository.save(result);
  

  };

};