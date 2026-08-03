import { Request, Response } from 'express';
import IndexModulesServicess from '../services/Modules/indexModulesServices';
import ShowModulesServices from '../services/Modules/showModulesServices';

export default class modulesController {

  public async index(request:Request, response:Response):Promise<Response>{

    const {uuidmodulo} = request.params;

    const services = new IndexModulesServicess();

    const result = await services.execute(uuidmodulo);

    return response.json(result);
    
  };

  public async show(request: Request, response: Response): Promise<Response> {

    const services = new ShowModulesServices();
      
    const result = await services.execute();

    return response.json(result);

  };
    
};




