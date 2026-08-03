import StorageProvider from '../../../shared/providers/diskStorageProvider';
import { notFound } from "../../../shared/errors/errorFactories";
import { repository, entity } from '../../../shared/infra/typeorm/repositories/worksRepository';

interface IRequestDTO {
  _uuid: string;
  uuidlicenca: string;
  user_at: string;
  filename: string;
}

export default class UploadWorkPhotoServices {
  public async execute(object: IRequestDTO): Promise<entity> {
    const result = await repository.findOneBy({ _uuid: object._uuid });

    if (!result) {
      throw notFound();
    }

    if (result.uuidlicenca !== object.uuidlicenca) {
      throw notFound('Obra nao encontrada para esta licenca.');
    }

    const storageProvider = new StorageProvider();
    const pathFile = await storageProvider.saveFile('obras', object.filename, object._uuid);
    const updated = await repository.save({
      ...result,
      foto: pathFile,
      user_at: object.user_at,
    });

    if (result.foto) {
      await storageProvider.deleteFile('obras', result.foto, object._uuid);
    }

    return updated;
  }
}
