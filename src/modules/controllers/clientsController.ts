import { Request, Response } from 'express';
import CreateClientsServices from '../services/Clients/createClientsServices';
import ReadClientsServices from '../services/Clients/readClientsServices';
import ShowClientsServices  from '../services/Clients/showClientsServices';
import UpdateClientsServices from '../services/Clients/updateClientsServices'; 
import DeleteClientsServices from '../services/Clients/deleteClientsServices';
import IndexClientsServices from '../services/Clients/indexClientsServices';

export default class clientsController {

  public async create(request: Request, response: Response): Promise<Response>{

    request.body.user_at = request.user.uuidusuario;

    const services = new CreateClientsServices();

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async read(request: Request, response: Response): Promise<Response>{

    const services = new ReadClientsServices();

    const result = await services.execute(request.body);

    return response.json(result);

  };

  public async update(request :Request, response:Response): Promise<Response>{

    request.body.user_at = request.user.uuidusuario;


    const services = new UpdateClientsServices();

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async delete(request:Request, response:Response):Promise<Response>{

    const {uuidcliente} = request.params;

    const services = new DeleteClientsServices();

    const result = await services.execute({uuidcliente});

    return response.status(204).send();

  };

  public async index(request:Request, response:Response):Promise<Response>{
    
    const {uuidcliente} = request.params;

    const services = new IndexClientsServices();

    const result = await services.index({uuidcliente});

    return response.json(result);

  };

  public async show(request: Request, response: Response): Promise<Response> {
    
    const services = new ShowClientsServices();

    const result = await services.execute();

    return response.json(result);

  };

};




