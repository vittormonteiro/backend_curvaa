import { Request, Response } from 'express';
import PermissionValidation from '../services/middlewares/permissionValidation';
import CreatePermissionsServices from '../services/Permissions/createPermissionsServices';
import UpdatePermissionsServices from '../services/Permissions/updatePermissionsServices';
import DeletePermissionsServices from '../services/Permissions/deletePermissionsServices';
import IndexPermissionsServices  from '../services/Permissions/indexPermissionsServices';
import ShowPermissionsServices   from '../services/Permissions/showPermissionsServices';

export default class permissionsController {

  private static async allowed(request: Request, method: string): Promise<void>{
    const uuidusuario = request.user.uuidusuario;
    const uuidmodulo = "84e23af0-09e0-4592-b5c9-a897b93b665b";
    await PermissionValidation({uuidusuario, uuidmodulo, method});
  };

  public async create(request: Request, response: Response): Promise<Response>{

    await permissionsController.allowed(request, 'create');

    const services = new CreatePermissionsServices();

    request.body.user_at = request.user.uuidusuario;

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async update(request: Request, response: Response): Promise<Response>{

    await permissionsController.allowed(request, 'update');

    request.body.user_at = request.user.uuidusuario;

    const services = new UpdatePermissionsServices();

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async delete(request: Request, response: Response): Promise<Response>{

    await permissionsController.allowed(request, 'delete');

    const { uuidpermissao } = request.params;

    const services = new DeletePermissionsServices();

    await services.execute({ uuidpermissao });

    return response.status(204).send();

  };

  public async index(request: Request, response: Response): Promise<Response>{

    await permissionsController.allowed(request, 'read');

    const { uuidpermissao } = request.params;

    const services = new IndexPermissionsServices();

    const result = await services.execute({ uuidpermissao });

    return response.json(result);

  };

  public async show(request: Request, response: Response): Promise<Response>{
    
    const services = new ShowPermissionsServices();

    const result = await services.execute();

    return response.json(result);
    
  };

};




