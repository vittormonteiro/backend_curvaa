import { AppDataSource } from "../../../shared/infra/typeorm/data-source";
import { notFound, forbidden } from "../../../shared/errors/errorFactories";
import PermissionValidation from '../../services/middlewares/permissionValidation';
import Entity from '../../../shared/infra/typeorm/entities/buyServicesProducts';

export default class avaliateBuyServicesOrProductsServices {

  public async execute(object: Entity): Promise<Entity> {

    const entity =  AppDataSource.getRepository(Entity);

    const result = await entity.findOneBy({uuidaquisicao: object.uuidaquisicao});

    if (!result) {
      throw notFound();
    }

    if (result.situacao == "245e4e89-9175-493f-94bc-f3fc262b3294") {
      throw forbidden(`Permitido somente para aquisições diferentes de *EM ANÁLISE*!\n\b Em caso de dúvidas, contate o suporte.`);
    }

    if(object.avaliador != result.uuidusuario){

      const uuidusuario = object.user_at;
      const uuidmodulo = '085d1753-b69c-4d12-b2a4-76c7cead67f2';
      const method = 'update';
      const msg = `Permitido somente ao financeiro ou solicitante da aquisição!\n\b Em caso de dúvidas, contato o suporte.`;

      await PermissionValidation({uuidusuario, uuidmodulo, method, msg});

    }

    result.avaliador = object.avaliador;
    result.avaliacao = object.avaliacao;
    result.dt_avaliacao = new Date();
    result.descricao_avaliacao = object.descricao_avaliacao || result.descricao_avaliacao;
    result.justificativa = object.justificativa || result.justificativa;
    
    return await entity.save(result);

  };

};
