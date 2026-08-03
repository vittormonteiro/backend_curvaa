import {repositoryView} from '../../../shared/infra/typeorm/repositories/permissionsRepository';

interface IRequestDTO{
    uuidusuario: string;
    uuidmodulo: string;
    method: string;
}

export default class readPermissionsServices {

    public async execute(object:IRequestDTO): Promise<boolean> {

        const result = await repositoryView.findByText(object);

        return result ? true : false;

    };

};
