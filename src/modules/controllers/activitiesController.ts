import { Request, Response } from 'express';
import CreateActivitiesServices from '../services/Activities/createActivitiesServices';
import ReadActivitiesServices from '../services/Activities/readActivitiesServices';
import UpdateActivitiesServices from '../services/Activities/updateActivitiesServices';
import DeleteActivitiesServices from '../services/Activities/deleteActivitiesServices';
import IndexActivitiesServices from '../services/Activities/indexActivitiesServices';
import ShowActivitiesServices from '../services/Activities/showActivitiesServices';
import ImportActivitiesServices from '../services/Activities/importActivitiesServices';

export default class activitiesController {

  public async create(request: Request, response: Response): Promise<Response> {

    const services = new CreateActivitiesServices();

    request.body.user_at = request.user.uuidusuario;
    request.body.uuidlicenca = request.user.uuidlicenca;

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async read(request: Request, response: Response): Promise<Response> {

    const services = new ReadActivitiesServices();

    request.body.uuidlicenca = request.user.uuidlicenca;

    const result = await services.execute(request.body);

    return response.json(result);

  };

  public async update(request: Request, response: Response): Promise<Response> {

    request.body.user_at = request.user.uuidusuario;
    request.body.uuidlicenca = request.user.uuidlicenca;

    const services = new UpdateActivitiesServices();

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async delete(request: Request, response: Response): Promise<Response> {

    const { _uuid } = request.params;

    const services = new DeleteActivitiesServices();

    await services.execute({ _uuid, uuidlicenca: request.user.uuidlicenca });

    return response.status(204).send();

  };

  public async import(request: Request, response: Response): Promise<Response> {

    const services = new ImportActivitiesServices();

    request.body.user_at = request.user.uuidusuario;
    request.body.uuidlicenca = request.user.uuidlicenca;

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async index(request: Request, response: Response): Promise<Response> {

    const { _uuid } = request.params;

    const services = new IndexActivitiesServices();

    const result = await services.execute({ _uuid, uuidlicenca: request.user.uuidlicenca });

    return response.json(result);

  };

  public async show(request: Request, response: Response): Promise<Response> {
    
    const services = new ShowActivitiesServices();

    const result = await services.execute();

    return response.json(result);
    
  };

};
