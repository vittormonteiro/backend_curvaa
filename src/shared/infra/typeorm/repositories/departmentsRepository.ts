import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/departments";
import EntityView from "../../../../shared/infra/typeorm/entities/departmentsView";

export type entity = Entity;
export type view = EntityView;

export const repository = AppDataSource.getRepository(Entity);

export const repositoryView = AppDataSource.getRepository(EntityView).extend({

  async findByStatus(status: string): Promise<EntityView[] | []> {

    return this.find({
      where : {
        status
      },
    });

  },

  async findByDepartments(departamento: string): Promise<EntityView | null> {

    return this.findOne({
      where : {
        departamento
      },
    });
    
  }

});

