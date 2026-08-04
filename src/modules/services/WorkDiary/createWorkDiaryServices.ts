import { badRequest } from "../../../shared/errors/errorFactories";
import AppError from "../../../shared/errors/appError";
import { repository, entity } from "../../../shared/infra/typeorm/repositories/workDiaryRepository";
import { assertDiaryWorkBelongsToLicense } from "./workDiaryRules";

export interface IWorkDiaryPayload extends Partial<entity> {
  uuidlicenca?: string;
}

export default class CreateWorkDiaryServices {
  public async execute(object: IWorkDiaryPayload): Promise<entity> {
    await assertDiaryWorkBelongsToLicense(String(object.uuidobra), object.uuidlicenca);

    try {
      const content = repository.create(object);
      return await repository.save(content);
    } catch (error) {
      const message = error instanceof Error || error instanceof AppError ? error.message : String(error);
      throw badRequest(message);
    }
  }
}
