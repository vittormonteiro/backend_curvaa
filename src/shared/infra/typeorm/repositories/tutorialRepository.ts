import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../entities/tutorial";
import EntityView from "../entities/tutorialView";

export type entity = Entity;
export type view = EntityView;

export const repository = AppDataSource.getRepository(Entity);

export const repositoryView = AppDataSource.getRepository(EntityView).extend({

    async findByModuleAndUser(uuidmodulo: string, uuidusuario: string):Promise<view | null> {
       
        return this.findOne({
            where:{
                uuidmodulo, uuidusuario
            }
        });

    }
    
});

