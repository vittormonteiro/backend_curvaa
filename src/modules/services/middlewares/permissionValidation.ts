import ReadPermissionsServices   from '../../services/Permissions/readPermissionsServices';
import { forbidden } from "../../../shared/errors/errorFactories";

interface IRequestDTO{
    uuidusuario: string;
    uuidmodulo: string;
    method: string;
    msg?: string;
};

export default async function permissionValidation({uuidusuario, uuidmodulo, method, msg}: IRequestDTO): Promise<void>  {

    const services = new ReadPermissionsServices();

    const result = await services.execute({uuidusuario, uuidmodulo, method});

    if(!result){
        return msg ? forbidden(msg) : forbidden();
    }

};
