import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/usersRepair";

export const repository = AppDataSource.getRepository(Entity).extend({

    async findByEmail(email : string):Promise<Entity | null>{

        return this.findOne({
            where:{
                email
            }
        });

    },
    
});