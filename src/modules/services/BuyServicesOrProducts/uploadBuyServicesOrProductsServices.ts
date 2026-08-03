import StorageProvider from '../../../shared/providers/diskStorageProvider';
import { notFound } from "../../../shared/errors/errorFactories";
import {repository, entity} from '../../../shared/infra/typeorm/repositories/buyServicesProductsRepository';
import PermissionValidation from '../../services/middlewares/permissionValidation';

interface IRequestDTO {
  uuidaquisicao: string;
  user_at: string;
  field: string;
  filename: string;
  codigo_nf: string;
};

export default  class uploadBuyServicesOrProductsServices {

  public async execute(object: IRequestDTO): Promise<entity> {

    const folder = object.field;
    
    const storageProvider = new StorageProvider();
    
    const uuidaquisicao = object.uuidaquisicao;
    const result = await repository.findOneBy({uuidaquisicao});
    
    if (!result) {
      throw notFound();
    }

    if(result.uuidusuario != object.user_at){

      const uuidusuario = object.user_at;
      const uuidmodulo = '085d1753-b69c-4d12-b2a4-76c7cead67f2';
      const method = 'update';
      
      await PermissionValidation({uuidusuario, uuidmodulo, method});

    }

    const pathFile  = await storageProvider.saveFile(folder, object.filename, '');

    const updated = {...result, [object.field]:pathFile, user_at: object.user_at};

    if(object.field == 'nf'){
      updated.codigo_nf = object.codigo_nf;
    }
    
    const result3 =  await repository.save(updated);

    const pathOld = object.field == 'nf' ? result.nf : result.orcamento;

    if (pathOld) {
      await storageProvider.deleteFile(folder, pathOld, '');
    }

    return result3

  };

};