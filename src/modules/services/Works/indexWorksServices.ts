import { notFound } from "../../../shared/errors/errorFactories";
import { repository, entity } from '../../../shared/infra/typeorm/repositories/worksRepository';
//import PermissionValidation from "../middlewares/permissionValidation";

interface IRequestDTO {
    _uuid: string;
    uuidusuario: string;
    uuidlicenca: string;
}

export default class indexWorksServices {

    public async execute(object: IRequestDTO): Promise<entity> {

        const result = await repository.findOneBy({"_uuid": object._uuid});

        if (!result) {
            throw notFound()
        }

        if (result.uuidlicenca !== object.uuidlicenca) {
            throw notFound('Obra nao encontrada para esta licenca.');
        }

        /*
        if (object.uuidusuario == result.uuidgerente || object.uuidusuario == result.uuidcoordenador) {
            return result;
        }

        const uuidmodulo = "91bae583-5559-452f-bb1d-9abecf543c53";
        const method = 'update';
        const msg = `Permitido somente ao responsável pelo projeto!\nEm caso de dúvidas, contato o suporte.`;

        await PermissionValidation({
            "uuidusuario": object.uuidusuario,
            "uuidmodulo": uuidmodulo,
            "method": method,
            "msg": msg
        });
        */

        return result;

    }

};
