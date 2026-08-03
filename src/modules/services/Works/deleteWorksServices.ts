import { notFound } from "../../../shared/errors/errorFactories";
import { repository } from '../../../shared/infra/typeorm/repositories/worksRepository';
//import PermissionValidation from "../middlewares/permissionValidation";

interface IRequestDTO {
    _uuid: string;
    uuidusuario: string;
}

export default class deleteWorksServices {

    public async execute(object: IRequestDTO): Promise<void> {

        const result = await repository.findOneBy({"_uuid": object._uuid});

        if (!result) {
            throw notFound()
        }

        result.status = "SUSPENSO";
        result.user_at = object.uuidusuario;

        /*
        if (object.uuidusuario == result.uuidgerente || object.uuidusuario == result.uuidcoordenador) {
            await repository.save(result);
        }

        const uuidmodulo = "91bae583-5559-452f-bb1d-9abecf543c53";
        const method = 'update';
        const msg = `Permitido somente aos responsáveis pelo projeto!\nEm caso de dúvidas, contato o suporte.`;

        await PermissionValidation({
            "uuidusuario": object.uuidusuario,
            "uuidmodulo": uuidmodulo,
            "method": method,
            "msg": msg
        });
        */

        await repository.save(result);

    }

};
