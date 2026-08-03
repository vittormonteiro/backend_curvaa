import { Request, Response } from 'express';
import CreateInformativeServices from '../services/Informative/createInformativeServices';
import ReadInformativeServices from '../services/Informative/readInformativeServices';
import UpdateInformativeServices from '../services/Informative/updateInformativeServices';
import DeleteInformativeServices from '../services/Informative/deleteInformativeServices';
import IndexInformativeServices from '../services/Informative/indexInformativeServices';
import ShowInformativeServices  from '../services/Informative/showInformativeServices';

export default class informativeController {

  public async create(request: Request, response: Response): Promise<Response>{

    const services = new CreateInformativeServices();

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async read(request :Request, response:Response): Promise<Response>{

    const services = new ReadInformativeServices();

    const result = await services.execute(request.body);

    return response.json(result);

  };

  public async update(request :Request, response:Response): Promise<Response>{

    const {uuidcomunicado} = request.params;
    
    const {uuidusuario, status, comunicado, data} = request.body;

    const services = new UpdateInformativeServices();

    const result = await services.execute({uuidcomunicado, uuidusuario, status, comunicado, data});

    return response.status(201).json(result);

  };

  public async delete(request:Request, response:Response):Promise<Response>{

    const {uuidcomunicado} = request.params;

    const services = new DeleteInformativeServices();

    await services.execute({uuidcomunicado});

    return response.status(204).send();

  };

  public async index(request:Request, response:Response):Promise<Response>{

    const {uuidcomunicado} = request.params;

    const services = new IndexInformativeServices();

    const result = await services.execute({uuidcomunicado});

    return response.json(result);

  };

  public async show(request: Request, response: Response): Promise<Response> {

    const services = new ShowInformativeServices();

    const result = await services.execute();

    return response.json(result);

  };

};




