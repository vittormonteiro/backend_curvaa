import StorageProvider from "../../../shared/providers/diskStorageProvider";
import { badRequest, notFound } from "../../../shared/errors/errorFactories";
import { repository, entity } from "../../../shared/infra/typeorm/repositories/workDiaryRepository";
import { assertDiaryWorkBelongsToLicense } from "./workDiaryRules";

interface IRequestDTO {
  _uuid: string;
  uuidlicenca: string;
  user_at: string;
  files: Express.Multer.File[];
}

export default class UploadWorkDiaryPhotosServices {
  public async execute({ _uuid, uuidlicenca, user_at, files }: IRequestDTO): Promise<entity> {
    const result = await repository.findOneBy({ _uuid });

    if (!result) {
      throw notFound();
    }

    await assertDiaryWorkBelongsToLicense(result.uuidobra, uuidlicenca);

    if (!files.length || files.length > 4) {
      throw badRequest('Envie de 1 a 4 fotos.');
    }

    const storageProvider = new StorageProvider();
    const oldPhotos = [result.foto1, result.foto2, result.foto3, result.foto4].filter(Boolean) as string[];
    const newPhotos: string[] = [];

    for (const file of files) {
      newPhotos.push(await storageProvider.saveFile('diarios', file.filename, _uuid));
    }

    for (const photo of oldPhotos) {
      await storageProvider.deleteFile('diarios', photo, _uuid);
    }

    const payload = repository.merge(result, {
      foto1: newPhotos[0] || null,
      foto2: newPhotos[1] || null,
      foto3: newPhotos[2] || null,
      foto4: newPhotos[3] || null,
      user_at,
    });

    return repository.save(payload);
  }
}
