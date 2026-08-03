import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/days";
import EntityView from "../../../../shared/infra/typeorm/entities/daysView";

export type entity = Entity;
export type view = EntityView;

export const repository = AppDataSource.getRepository(Entity);

export const repositoryView = AppDataSource.getRepository(EntityView).extend({

  async findByYear(ano: string): Promise<EntityView[] | []> {

    return this.find({
      where : {ano}
    });

  },

  async findByText(ano: string, codigo: string): Promise<EntityView | null> {

    return this.findOne({
      where : {ano, codigo}
    });

  }

});

