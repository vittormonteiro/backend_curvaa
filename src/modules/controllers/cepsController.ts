import { Request, Response } from 'express';
import ReadCepsServices from '../services/Ceps/readCepsServices';

export default class cepsController {

  public async read(request: Request, response: Response): Promise<Response> {

    const cep = request.body.cep;
    
    const services = new ReadCepsServices();

    const result = await services.execute(cep);
    
    return response.json(result);

  };

};




