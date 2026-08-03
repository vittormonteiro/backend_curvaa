import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/daysRepository';

interface IRequestDTO {
  ano: string;
};

export default class readDaysServices {

  public async execute({ano}: IRequestDTO): Promise<view[]> {

    return await repositoryView.findByYear(ano);

  };

};
