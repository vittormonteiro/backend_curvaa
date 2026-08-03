import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from '../../../../shared/infra/typeorm/entities/activities';
import EntityView from '../../../../shared/infra/typeorm/entities/activitiesView';
import DependenciesEntity from '../../../../shared/infra/typeorm/entities/activitiesDependencies';

export type entity = Entity;
export type view = EntityView;
export type dependency = DependenciesEntity;

export const repository = AppDataSource.getRepository(Entity);
export const repositoryDependencies = AppDataSource.getRepository(DependenciesEntity).extend({

  async findByActivity(uuidatividade: string): Promise<dependency[]> {
    return await this.find({
      where: { uuidatividade },
    });
  },

  async deleteByActivity(uuidatividade: string): Promise<void> {
    await this.delete({ uuidatividade });
  },

  async deleteByDependent(uuidatividade_dependente: string): Promise<void> {
    await this.delete({ uuidatividade_dependente });
  },

});

export const repositoryView = AppDataSource.getRepository(EntityView).extend({

  async findByStatusAndLincense(status:string, uuidlicenca:string): Promise<view[] | []> {
    
    return await this.find({
      where : {
        status, uuidlicenca
      }
    });
    
  },

  async findByWorks(uuidobra:string, uuidlicenca?: string): Promise<view[] | []> {
    return await this.find({
      where : {
        uuidobra,
        ...(uuidlicenca ? { uuidlicenca } : {})
      },
      order: {
        etapa:'ASC'
      }
    });
  }

});
