import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import EntityView from "../../../../shared/infra/typeorm/entities/notificationEmailView";

export type view = EntityView;

export const repositoryView = AppDataSource.getRepository(EntityView).extend({

    async findByStatus(situacao: string):Promise <view[] | []>{

        //    limit of 150 sends emails by hours(documentation of UOL)
        
        return this.find({
            where:{
                situacao: situacao
            },
            take: 25
            //Repeat cron job in 10 min
        });

    },

    async findByStatusAndTitle(situacao: string, titulo: string):Promise <view[] | []>{

        return this.find({
            where:{
                situacao: situacao,
                titulo: titulo
            },
            take: 25
            //Repeat cron job in 10 min
        });

    },

    async findByProspect(situacao: string, titulo: string):Promise <view | null>{

        return this.findOne({
            where:{
                situacao: situacao,
                titulo: titulo,
            },
            order: {
                email: 'DESC'
            }
            //Repeat cron job in 30 seconds
        });

    },

});