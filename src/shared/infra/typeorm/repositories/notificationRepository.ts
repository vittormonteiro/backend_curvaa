import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/notification";
import EntityView from "../../../../shared/infra/typeorm/entities/notificationView";

export type entity = Entity;
export type view = EntityView;

export const repository = AppDataSource.getRepository(Entity).extend({

    async insertRows(object: entity):Promise <string>{

        await repository.manager
        .createQueryBuilder()
        .insert()
        .into(Entity)
        .values(object)         // INSERE EM LOTE
        .orIgnore()          // IGNORA DUPLICADOS
        .execute();

        return 'Notification created successfully';

    },

    async findByStatusAndUser(send_at: boolean, uuidusuario: string):Promise <entity[] | []>{

        return this.find({
            where:{
                send_at, 
                uuidusuario
            }
        });

    }

});

export const repositoryView = AppDataSource.getRepository(EntityView);