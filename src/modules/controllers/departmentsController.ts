import { Request, Response } from 'express';
import PermissionValidation from '../services/middlewares/permissionValidation';
import CreateDepartmentsServices from '../services/Departments/createDepartmentsServices';
import ReadDepartmentsServices from '../services/Departments/readDepartmentsServices';
import UpdateDepartmentsServices from '../services/Departments/updateDepartmentsServices';
import DeleteDepartmentsServices from '../services/Departments/deleteDepartmentsServices';
import IndexDepartmentsServices from '../services/Departments/indexDepartmentsServices';
import ShowDepartmentsServices  from '../services/Departments/showDepartmentsServices';

export default class departmentsController {

  private static async allowed(request: Request, method: string): Promise<void>{
    const uuidusuario = request.user.uuidusuario;
    const uuidmodulo = "e118f8fe-4829-4924-9fe5-27394844e48e";
    await PermissionValidation({uuidusuario, uuidmodulo, method});
  };

  public async create(request: Request, response: Response): Promise<Response>{

    await departmentsController.allowed(request, 'create');

    const services = new CreateDepartmentsServices();

    request.body.user_at = request.user.uuidusuario;

    const result = await services.execute(request.body);

    return response.status(201).json(result);
    
  };

  public async read(request: Request, response: Response): Promise<Response>{

    const services = new ReadDepartmentsServices();

    const result = await services.execute(request.body);

    return response.json(result);
    
  };

  public async update(request :Request, response:Response): Promise<Response>{

    await departmentsController.allowed(request, 'update');

    request.body.user_at = request.user.uuidusuario;

    const services = new UpdateDepartmentsServices();

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async delete(request:Request, response:Response):Promise<Response>{

    await departmentsController.allowed(request, 'delete');

    const {uuiddeparta} = request.params;

    const services = new DeleteDepartmentsServices();

    await services.execute({uuiddeparta});

    return response.status(204).send();

  };

  public async index(request:Request, response:Response):Promise<Response>{

    await departmentsController.allowed(request, 'update');

    const { uuiddeparta } = request.params;

    const services = new IndexDepartmentsServices();

    const result = await services.execute({uuiddeparta});

    return response.json(result);

  };

  public async show(request: Request, response: Response): Promise<Response> {
    
    const services = new ShowDepartmentsServices();

    const result = await services.execute();
    
    return response.json(result);

  };

};




