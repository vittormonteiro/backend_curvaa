import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/license";

export type entity = Entity;

export const repository = AppDataSource.getRepository(Entity).extend({

  async findByKey(chave: string): Promise<entity | null> {
    return this.findOne({
      where: {
        chave,
        status: 'Ativo'
      }
    });
  },

  async findByClient(uuidcliente: string): Promise<entity | null> {
    return this.findOne({
      where: {
        uuidcliente
      }
    });
  },

  async updateUserLimit(uuidlicenca: string, limite_usuarios: number, user_at: string): Promise<void> {
    await this.update({ uuidlicenca }, { limite_usuarios, user_at });
  },

});
