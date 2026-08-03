import { AppDataSource } from "../../../shared/infra/typeorm/data-source";
import { notFound, forbidden } from "../../../shared/errors/errorFactories";
import Entity from '../../../shared/infra/typeorm/entities/buyServicesProducts';
import PermissionValidation from '../../services/middlewares/permissionValidation';

interface IRequestDTO{
  uuidaquisicao: string;
  uuidusuario: string;
};

export default class indexBuyServicesOrProductsServices {

  public async execute({uuidaquisicao, uuidusuario}: IRequestDTO): Promise<Entity> {

    const entity = AppDataSource.getRepository(Entity);

    const result = await entity.findOneBy({uuidaquisicao});

    if(!result){
      throw notFound();
    }

    //CONCLUIDO
    if(result.situacao === 'd04cd20a-3ff4-4c82-8173-3cd5e2d3b8cc'){
      throw forbidden(`Aquisição já CONCLUÍDA e não pode ser alterada.\n\b Em caso de dúvidas, contato o suporte.`);
    }

    if(result.uuidusuario !== uuidusuario){
    
      const uuidmodulo = '085d1753-b69c-4d12-b2a4-76c7cead67f2';
      const method = 'update';
      const msg = `Permitido somente ao financeiro ou solicitante da aquisição!\n\b Em caso de dúvidas, contato o suporte.`;

      await PermissionValidation({uuidusuario, uuidmodulo, method, msg});

      return result

    }

    return result;

  };
  
};
