import { notFound } from "../../../shared/errors/errorFactories";
import {repository, entity} from '../../../shared/infra/typeorm/repositories/permissionsRepository';

interface IResponseDTO {
    uuidpermissao: string;
}

export default class indexPermissionsServices {

    public async execute(uuidpermissao:IResponseDTO): Promise<entity> {

        const result = await repository.findOneBy(uuidpermissao);

        if(!result){
            throw notFound();
        }

        return result;
    }

};
