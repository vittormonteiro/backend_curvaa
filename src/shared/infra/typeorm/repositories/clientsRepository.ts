import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/clients";
import EntityView from "../../../../shared/infra/typeorm/entities/clientsView";

export type entity = Entity;
export type view = EntityView;

export const repository = AppDataSource.getRepository(Entity);

export const repositoryView = AppDataSource.getRepository(EntityView).extend({

  async findByText(nome: string):Promise <view[] | []>{  

    const normalizedName = nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[._-]/g, '');

    const sql = `
      regexp_replace(unaccent("cliente"), '[._-]', '', 'g') ILIKE '%${normalizedName}%'
      OR
      regexp_replace(unaccent("razao_social"), '[._-]', '', 'g') ILIKE '%${normalizedName}%'
    `;

    return await this.createQueryBuilder().where(sql).getMany();

  },

  async findByName(cliente: string):Promise <view | null>{  

    // Remove '.', '_', and '-' from the name before using in SQL
    const normalizedName = cliente.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[._-]/g, '');

    const sql = `regexp_replace(unaccent("cliente"), '[._-]', '', 'g') ILIKE '${normalizedName}'`;

    return await this
    .createQueryBuilder()
    .where(sql)
    .getOne();

  },

  async findByRazaoSocial(razao_social: string):Promise <view | null>{  

    // Remove '.', '_', and '-' from the name before using in SQL
    const normalizedName = razao_social.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[._-]/g, '');

    const sql = `regexp_replace(unaccent("razao_social"), '[._-]', '', 'g') ILIKE '${normalizedName}'`;

    return await this
    .createQueryBuilder()
    .where(sql)
    .getOne();

  },

  async findByCNPJ(cpf_cnpj: string):Promise <view | null>{
    
    const sql = `_cpf_cnpj = '${cpf_cnpj}'`;

    return await this
    .createQueryBuilder()
    .where(sql)
    .getOne();

  },

  async findByStatus(status: string): Promise<view[] | []> {

    return this.find({
      where : {
        status
      },
    });
      
  },

});