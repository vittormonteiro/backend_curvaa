import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/usersFunctions";

export const usersFunctionsRepository = AppDataSource.getRepository(Entity).extend({

  async findById(uuidfunction: string): Promise<Entity | null> {

    const faturamento = this.findOne({
      where : {
        uuidfunction
      },

    });
    return faturamento;

  }

});

