import { Request, Response } from 'express';
import PermissionValidation from '../services/middlewares/permissionValidation';
import CreateDaysServices from '../services/Days/createDaysServices';
import ReadDaysServices from '../services/Days/readDaysServices';
import UpdateDaysServices from '../services/Days/updateDaysServices';
import DeleteDaysServices from '../services/Days/deleteDaysServices';
import IndexDaysServices from '../services/Days/indexDaysServices';
import ShowDaysServices from '../services/Days/showDaysServices';

export default class daysController {

  private static async allowed(request: Request, method: string): Promise<void>{
    const uuidusuario = request.user.uuidusuario;
    const uuidmodulo = "81307b6a-d99a-4fbd-86f0-c8492ebca813";
    await PermissionValidation({uuidusuario, uuidmodulo, method});
  };

  public async create(request: Request, response: Response): Promise<Response>{

    await daysController.allowed(request, 'create');

    request.body.user_at = request.user.uuidusuario;
    
    const services = new CreateDaysServices();

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async read(request:Request, response:Response):Promise<Response>{

    const services = new ReadDaysServices();

    const result = await services.execute(request.body);

    return response.json(result);

  };

  public async update(request :Request, response:Response): Promise<Response>{

    await daysController.allowed(request, 'update');

    request.body.user_at = request.user.uuidusuario;

    const services = new UpdateDaysServices();

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };
    
  public async delete(request:Request, response:Response):Promise<Response>{

    await daysController.allowed(request, 'delete');

    const {uuiddiasuteis} = request.params;

    const services = new DeleteDaysServices();

    await services.execute({uuiddiasuteis});

    return response.status(204).send();

  };

  public async index(request:Request, response:Response):Promise<Response>{

    const {uuiddiasuteis} = request.params;

    const services = new IndexDaysServices();

    const result = await services.execute({uuiddiasuteis});

    return response.json(result);

  };

  public async show(request:Request, response:Response):Promise<Response>{

    const services = new ShowDaysServices();

    const result = await services.execute();

    return response.json(result);

  };
    
};




