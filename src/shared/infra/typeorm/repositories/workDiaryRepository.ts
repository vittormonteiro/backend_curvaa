import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/workDiary";

export type entity = Entity;

export const repository = AppDataSource.getRepository(Entity).extend({

  async findByWork(uuidobra: string): Promise<entity[] | []> {
    return this.find({
      where: { uuidobra },
      order: {
        data_vistoria: 'DESC',
        created_at: 'DESC',
      },
    });
  },

});
