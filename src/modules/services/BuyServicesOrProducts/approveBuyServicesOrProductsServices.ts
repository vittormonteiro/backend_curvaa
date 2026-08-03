import { AppDataSource } from "../../../shared/infra/typeorm/data-source";
import { notFound, forbidden } from "../../../shared/errors/errorFactories";
import PermissionValidation from '../../services/middlewares/permissionValidation';
import Entity from '../../../shared/infra/typeorm/entities/buyServicesProducts';
import Entity2 from '../../../shared/infra/typeorm/entities/buyServicesProductsView';
import Entity3 from '../../../shared/infra/typeorm/entities/usersView';

export default class approveBuyServicesOrProductsServices {

  public async execute(object: Entity): Promise<Entity> {

    const entity =  AppDataSource.getRepository(Entity);
    const entity2 = AppDataSource.getRepository(Entity2);
    const entity3 = AppDataSource.getRepository(Entity3);

    const result = await entity.findOneBy({uuidaquisicao: object.uuidaquisicao});

    if (!result) {
      throw notFound();
    }

    if (result.situacao == "d04cd20a-3ff4-4c82-8173-3cd5e2d3b8cc") {
      throw forbidden(`Permitido somente para aquisições diferentes de *CONCLUÍDO*!\n\b Em caso de dúvidas, contate o suporte.`);
    }

    const result2 = await entity2.findOneBy({uuidaquisicao: object.uuidaquisicao});

    if (!result2) {
      throw notFound();
    }

    const result3 = await entity3.findOneBy({uuidusuario: object.user_at});

    if (!result3) {
      throw notFound();
    }

    if(!result2.gerentes.includes(result3.usuario) && !result2.coordenadores.includes(result3.usuario)){

      const uuidusuario = object.user_at;
      const uuidmodulo = '085d1753-b69c-4d12-b2a4-76c7cead67f2';
      const method = 'update';
      const msg = `Permitido somente ao financeiro, gerente ou coordenador do projeto!\n\b Em caso de dúvidas, contato o suporte.`;

      await PermissionValidation({uuidusuario, uuidmodulo, method, msg});

    }

    result.situacao = object.situacao;
    result.aprovador = object.user_at;
    result.dt_aprovacao = new Date();
    result.obs = object.obs;

    return await entity.save(result);

  };

};
