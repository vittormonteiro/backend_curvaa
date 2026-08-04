import { notFound } from "../../../shared/errors/errorFactories";
import { repository, entity } from "../../../shared/infra/typeorm/repositories/workDiaryRepository";
import { assertDiaryWorkBelongsToLicense } from "./workDiaryRules";

interface IRequestDTO {
  _uuid: string;
  uuidlicenca: string;
}

export default class IndexWorkDiaryServices {
  public async execute({ _uuid, uuidlicenca }: IRequestDTO): Promise<entity> {
    const result = await repository.findOneBy({ _uuid });

    if (!result) {
      throw notFound();
    }

    await assertDiaryWorkBelongsToLicense(result.uuidobra, uuidlicenca);

    return result;
  }
}
