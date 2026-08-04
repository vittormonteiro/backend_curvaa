import { badRequest } from "../../../shared/errors/errorFactories";
import { repository, entity } from "../../../shared/infra/typeorm/repositories/workDiaryRepository";
import { assertDiaryWorkBelongsToLicense } from "./workDiaryRules";

interface IRequestDTO {
  uuidobra: string;
  uuidlicenca: string;
}

export default class ReadWorkDiaryServices {
  public async execute({ uuidobra, uuidlicenca }: IRequestDTO): Promise<entity[] | []> {
    if (!uuidobra) {
      throw badRequest('Obra obrigatoria.');
    }

    await assertDiaryWorkBelongsToLicense(uuidobra, uuidlicenca);

    return repository.findByWork(uuidobra);
  }
}
