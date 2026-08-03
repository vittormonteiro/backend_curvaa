import { AppDataSource } from "../../../../shared/infra/typeorm/data-source";
import Entity from "../../../../shared/infra/typeorm/entities/permissions";
import EntityView from "../../../../shared/infra/typeorm/entities/permissionsView";

interface IRequestDTO{
    uuidusuario: string;
    uuidmodulo: string;
    method: string;
}

export type entity = Entity;
export type view = EntityView;

export const repository = AppDataSource.getRepository(Entity);

export const repositoryView = AppDataSource.getRepository(EntityView).extend({

    async findByText(object:IRequestDTO):Promise <view | null>{

        const sql = `"uuidusuario" = '${object.uuidusuario}'::uuid and 
        "uuidmodulo" = '${object.uuidmodulo}'::uuid and 
        "${object.method}" = true`;

        return await this
        .createQueryBuilder()
        .where(sql)
        .getOne();

    }

});