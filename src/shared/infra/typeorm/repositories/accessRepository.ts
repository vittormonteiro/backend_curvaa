import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/access";

export type entity = Entity;

export const repository = AppDataSource.getRepository(Entity).extend({

    async findByLogin(login: string):Promise<entity | null>{

        return this.findOne({
            where:{
                login
            }
        });

    },

    async findByEmail(email: string):Promise<entity | null>{

        return this.findOne({
            where:{
                email
            }
        });

    },

    async findByLoginOrEmail(texto: string):Promise<entity | null>{

        return this.findOne({
            where: [
                {
                    login: texto
                }, 
                {
                    email: texto
                }
            ]
        });

    },

});