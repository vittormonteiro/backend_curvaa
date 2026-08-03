import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/ceps";

export type entity = Entity;

export const repository = AppDataSource.getRepository(Entity).extend({

  async findByCep(cep: string): Promise<entity | null> {
    return this.findOne({
      where : {
        cep
      },
    });
  }

});

