import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/buyServicesProducts";
import EntityView from "../../../../shared/infra/typeorm/entities/buyServicesProductsView";

export type entity = Entity;
export type view = EntityView;

export const repository = AppDataSource.getRepository(Entity);

export const repositoryView = AppDataSource.getRepository(EntityView).extend({

  async findByStatus(situacao: string): Promise<view[] | []> {

    return  this.find({
      where : [{situacao}]
    });

  }

});

