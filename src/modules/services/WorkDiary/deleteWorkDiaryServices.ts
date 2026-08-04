import StorageProvider from "../../../shared/providers/diskStorageProvider";
import { notFound } from "../../../shared/errors/errorFactories";
import { repository } from "../../../shared/infra/typeorm/repositories/workDiaryRepository";
import { assertDiaryWorkBelongsToLicense } from "./workDiaryRules";

interface IRequestDTO {
  _uuid: string;
  uuidlicenca: string;
}

export default class DeleteWorkDiaryServices {
  public async execute({ _uuid, uuidlicenca }: IRequestDTO): Promise<void> {
    const result = await repository.findOneBy({ _uuid });

    if (!result) {
      throw notFound();
    }

    await assertDiaryWorkBelongsToLicense(result.uuidobra, uuidlicenca);

    const storageProvider = new StorageProvider();
    const photos = [result.foto1, result.foto2, result.foto3, result.foto4].filter(Boolean) as string[];

    for (const photo of photos) {
      await storageProvider.deleteFile('diarios', photo, result._uuid);
    }

    await repository.remove(result);
  }
}
