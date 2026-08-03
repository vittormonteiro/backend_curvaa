import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/informative";
import EntityView from "../../../../shared/infra/typeorm/entities/informative";

export type entity = Entity;
export type view = EntityView;

export const repository = AppDataSource.getRepository(Entity);

export const repositoryView = AppDataSource.getRepository(EntityView).extend({

    async findByStatus(status: boolean): Promise<view[] | []> {

      return this.find({
        where : {
          status
        },
        order: {
          data: 'DESC'
        }
      });
 
    },

    async findByText(comunicado: string): Promise<view | null> {

      return this.findOne({
        where : {
          comunicado
        },
      });
 
    }

});

