import { Request, Response } from 'express';
import PermissionValidation from '../services/middlewares/permissionValidation';
import CreateUsersServices  from '../services/Users/createUsersServices';
import ReadUsersServices from '../services/Users/readUsersServices';
import UpdateUsersServices from '../services/Users/updateUsersServices';
import DeleteUsersServices from '../services/Users/deleteUsersServices';
import IndexUsersServices from '../services/Users/indexUsersServices';
import ShowUsersServices from '../services/Users/showUsersServices';
//import UploadFilesServices from '../services/Files/uploadFilesServices';

export default class usersControllers {

  private static async allowed(request: Request, method: string): Promise<void>{
    const uuidusuario = request.user.uuidusuario;
    const uuidmodulo = "04ff5ae8-431d-4262-b966-7f12f09bdfcd";
    await PermissionValidation({uuidusuario, uuidmodulo, method});
  };

  public async create(request: Request, response: Response): Promise<Response> {

    await usersControllers.allowed(request, 'create');

    const services = new CreateUsersServices();

    request.body.uuidlicenca = request.user.uuidlicenca;
    request.body.user_at = request.user.uuidusuario;

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async read(request: Request , response: Response){

    const services = new ReadUsersServices();

    const result = await services.execute(request.body);

    return response.json(result);

  };

  public async update(request :Request, response:Response): Promise<Response>{

    await usersControllers.allowed(request, 'update');

    request.body.user_at = request.user.uuidusuario;
    request.body.uuidlicenca = request.user.uuidlicenca;
  
    const services = new UpdateUsersServices();
    
    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async delete(request: Request , response: Response){

    await usersControllers.allowed(request, 'delete');

    const {uuidusuario} = request.params;

    const services = new DeleteUsersServices();

    await services.execute({uuidusuario});

    return response.status(204).send();

  };

  public async index(request: Request , response: Response){

    await usersControllers.allowed(request, 'update');

    const {uuidusuario} = request.params;

    const services = new IndexUsersServices();

    const result = await services.execute({uuidusuario});

    return response.json(result);

  };

  public async show(request: Request , response: Response){

    const services = new ShowUsersServices();

    const result = await services.execute();
  
    return response.json(result);

  };

  /*
  public async upload(request: Request, response: Response): Promise<Response> {

    await usersControllers.allowed(request, 'update')){
      return response.status(403).json("Acesso restrito!");
    }

    const services = new UploadFilesServices();

    request.body.user_at = request.user.uuidusuario;

    request.body.uuidusuario = request.body.uuidusuario;

    request.body.file = request.file;

    const result = await services.execute(request.body);

    return response.json(result);

  };
  */

};


