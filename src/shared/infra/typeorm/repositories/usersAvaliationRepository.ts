import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/users";
import EntityView from "../../../../shared/infra/typeorm/entities/usersViewAvaliation";

export type entity = any;
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

    }
    
});

export const repositoryView = AppDataSource.getRepository(EntityView).extend({

  async findUsers(status: string, external: string): Promise<view[] | []> {

    const symbol = external == 'EXTERNO' ? '=' : '!=';
    const sql = `status = '${status}' and local_trabalho ${symbol} 'EXTERNO'`;

    return await this
    .createQueryBuilder()
    .where(sql)
    .getMany();
    
  },

  async findUsersByStatus(status: string): Promise<view[] | []> {

    return this.find({
      where: [{status}]
    });
    
  },

  async findUsersByExternal(external: string): Promise<view[] | []> {

    const symbol = external == 'EXTERNO' ? '=' : '!=';
    const sql = `local_trabalho ${symbol} 'EXTERNO'`;

    return await this
    .createQueryBuilder()
    .where(sql)
    .getMany();
    
  }

});
