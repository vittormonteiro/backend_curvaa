import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/users";
import EntityView from "../../../../shared/infra/typeorm/entities/usersView";

export type entity = Entity;
export type view = EntityView;

export const repository = AppDataSource.getRepository(Entity).extend({

    async findByName(usuario: string):Promise<entity | null> {
       
        return this.findOne({
            where:{
                usuario
            }
        });

    },

    async findByEmail(email : string):Promise<entity | null>{

        return this.findOne({
            where:{
                email
            }
        });

    },

    async findByLogin(login : string):Promise<entity | null>{

        return this.findOne({
            where:{
                login
            }
        });

    },

    async findByCPF(cpf :string):Promise<entity | null>{

        return this.findOne({
            where: {cpf}
        });

    },

    async countActiveByLicense(uuidlicenca: string): Promise<number> {

        return this.count({
            where: {
                uuidlicenca,
                status: 'Ativo'
            }
        });

    }
    
});

export const repositoryView = AppDataSource.getRepository(EntityView).extend({

  async findDoc(doc: string): Promise<view[] | []> {

    return this.find({
      where : [{doc}]
    });
    
  },

  async findUsersByStatus(status: string): Promise<view[] | []> {

    return this.find({
      where: [{status}]
    });
    
  },

});
