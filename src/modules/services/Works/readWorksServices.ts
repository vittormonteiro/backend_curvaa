import { badRequest } from "../../../shared/errors/errorFactories";
import { repositoryView, view } from '../../../shared/infra/typeorm/repositories/worksRepository';

interface IRequestDTO {
  _uuid: string;
  status: string;
  uuidlicenca: string;
  nprojeto: string;
}

export default class readWorkServices {

  public async execute(object: IRequestDTO): Promise<view[] | view | null | []> {

    if (object._uuid) {
      return await repositoryView.findByUUID(object._uuid);
    }

    if (object.status) {
      return await repositoryView.findByStatus(object.status, object.uuidlicenca);
    }

    if (object.uuidlicenca) {
      return await repositoryView.findByLicense(object.uuidlicenca);
    }

    throw badRequest('Nenhum filtro informado.');

  }

};
