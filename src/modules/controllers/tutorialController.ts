import { Request, Response } from 'express';
import ReadTutorialServices from '../services/Tutorial/readTutorialServices';
import UpdateTutorialServices from '../services/Tutorial/updateTutorialServices';

export default class tutorialController {

  public async create(request: Request, response: Response): Promise<Response>{

    request.body.uuidusuario = request.user.uuidusuario;
    
    const services = new UpdateTutorialServices();

    const result = await services.execute(request.body);

    return response.status(202).json(result);

  };

  public async read(request :Request, response:Response): Promise<Response>{

    request.body.uuidusuario = request.user.uuidusuario;

    const services = new ReadTutorialServices();

    const result = await services.execute(request.body);

    return response.json(result);

  };
    
};




