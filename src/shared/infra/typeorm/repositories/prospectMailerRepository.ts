import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/prospecting";
import EntityView from "../../../../shared/infra/typeorm/entities/prospectingView";

export type entity = Entity;
export type view = EntityView;

export const repository = AppDataSource.getRepository(Entity);

export const repositoryView = AppDataSource.getRepository(EntityView).extend({

    async findByProspect(situacao: string, categoria: string):Promise <view | null>{

        return this.findOne({
            where:{
                situacao: situacao,
                categoria: categoria,
            },
            order: {
                email: 'DESC'
            }
            //Repeat cron job in 30 seconds
        });

    },

});