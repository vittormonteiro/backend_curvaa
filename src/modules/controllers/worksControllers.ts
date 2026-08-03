import { Request, Response } from 'express';
import CreateWorksServices from '../services/Works/createWorksServices';
import ReadWorksServices from '../services/Works/readWorksServices';
import UpdateWorksServices from '../services/Works/updateWorksServices';
import DeleteWorksServices  from '../services/Works/deleteWorksServices';
import IndexWorksServices  from '../services/Works/indexWorksServices';
import ShowWorksServices  from '../services/Works/showWorksServices';
import LastWorksServices  from '../services/Works/lastWorksServices';
import DashboardWorksServices from '../services/Works/dashboardWorksServices';
//import UpdateTeamsWorksServices from '../services/Works/updateTeamsWorksServices';

export default class worksControllers {


  public async create(request: Request, response: Response): Promise<Response> {

    const services = new CreateWorksServices();

    request.body.user_at = request.user.uuidusuario;
    request.body.uuidlicenca = request.user.uuidlicenca;

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async read(request: Request, response: Response): Promise<Response> {

    const services = new ReadWorksServices();

    request.body.uuidlicenca = request.user.uuidlicenca;

    const result = await services.execute(request.body);

    return response.json(result);

  };
    
  public async update(request: Request , response: Response): Promise<Response>{

    const services = new UpdateWorksServices();

    request.body.user_at = request.user.uuidusuario;
    request.body.uuidlicenca = request.user.uuidlicenca;

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async delete(request: Request, response: Response): Promise<Response> {
  
    const {_uuid} = request.params;
    const uuidusuario = request.user.uuidusuario;

    const services = new DeleteWorksServices();

    await services.execute({_uuid, uuidusuario});

    return response.status(204).send();

  };

  public async index(request: Request, response: Response): Promise<Response> {
  
    const {_uuid} = request.params;
    const uuidusuario = request.user.uuidusuario;

    const services = new IndexWorksServices();

    const result = await services.execute({_uuid, uuidusuario});

    return response.json(result);

  };

  public async show(request: Request, response: Response): Promise<Response> {
    
    const services = new ShowWorksServices();

    const result = await services.execute();

    return response.json(result);

  };

  public async last(request: Request, response: Response): Promise<Response> {
    
    const services = new LastWorksServices();

    const uuidlicenca = request.user.uuidlicenca;

    const result = await services.execute(uuidlicenca);

    return response.json(result);

  };

  public async dashboard(request: Request, response: Response): Promise<Response> {

    const services = new DashboardWorksServices();

    const result = await services.execute(request.user.uuidlicenca);

    return response.json(result);

  };
  
  /*
  public async updateTeams(request: Request , response: Response): Promise<Response>{

    request.body.user_at = request.user.uuidusuario;

    const services = new UpdateTeamsWorksServices();

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };
  */

};



