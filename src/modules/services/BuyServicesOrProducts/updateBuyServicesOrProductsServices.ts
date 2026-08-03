import { notFound } from "../../../shared/errors/errorFactories";
import {repository, entity} from '../../../shared/infra/typeorm/repositories/buyServicesProductsRepository';
import PermissionValidation from '../../services/middlewares/permissionValidation';

export default class updateBuyServicesOrProductsServices {

  public async execute(object: entity): Promise<entity> {

    const uuidaquisicao = object.uuidaquisicao;

    const result = await repository.findOneBy({uuidaquisicao});

    if (!result) {
      throw notFound();
    }

    const uuidusuario = object.user_at;
    const uuidmodulo = '085d1753-b69c-4d12-b2a4-76c7cead67f2';
    const method = 'update';

    if(result.uuidusuario != object.user_at){
      await PermissionValidation({uuidusuario, uuidmodulo, method});
    }

    object.situacao = '245e4e89-9175-493f-94bc-f3fc262b3294';

    return await repository.save(object);

  };

};
