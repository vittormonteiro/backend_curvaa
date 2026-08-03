import { AppDataSource } from "../data-source";
import Entity from "../entities/works";
import EntityView from "../entities/worksView";

export type entity = Entity;
export type view = EntityView;

export const repository = AppDataSource.getRepository(Entity).extend({

  async findByCode(codigo: string, uuidlicenca: string): Promise<entity | null> {

    return this.findOne({
      where: { codigo, uuidlicenca },
    });

  },

  async findByLincense(uuidlicenca: string): Promise<entity[] | []> {

    return this.find({
      where: { uuidlicenca },
    });

  },

});

export const repositoryView = AppDataSource.getRepository(EntityView).extend({

  async findByUUID(_uuid: string): Promise<view | null> {

    return this.findOne({
      where: { _uuid },
    });

  },

  async findByStatus(status: string, uuidlicenca: string): Promise<view[] | []> {

    return this.find({
      where: { status, uuidlicenca },
    });

  },

  async findByLicense(uuidlicenca: string): Promise<view[] | []> {

    return this.find({
      where: { uuidlicenca },
    });

  },

  async findLast(uuidlicenca: string): Promise<view | null> {

    const query =
      this.createQueryBuilder('v')
        .where('v.uuidlicenca = :uuidlicenca', { uuidlicenca })
        .orderBy('v.codigo', 'DESC');

    return await query.getOne();

  }

});
