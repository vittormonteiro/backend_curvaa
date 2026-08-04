import { notFound } from "../../../shared/errors/errorFactories";
import { repository, entity } from "../../../shared/infra/typeorm/repositories/workDiaryRepository";
import { assertDiaryWorkBelongsToLicense } from "./workDiaryRules";
import { IWorkDiaryPayload } from "./createWorkDiaryServices";

export default class UpdateWorkDiaryServices {
  public async execute(object: IWorkDiaryPayload): Promise<entity> {
    const result = await repository.findOneBy({ _uuid: object._uuid });

    if (!result) {
      throw notFound();
    }

    await assertDiaryWorkBelongsToLicense(result.uuidobra, object.uuidlicenca);
    await assertDiaryWorkBelongsToLicense(String(object.uuidobra), object.uuidlicenca);

    const payload = repository.merge(result, object);
    payload.uuidobra = result.uuidobra;

    return repository.save(payload);
  }
}
