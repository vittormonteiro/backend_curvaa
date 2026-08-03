import { Request, Response } from 'express';
import ForgotPasswordServices from '../services/Users/forgotPasswordServices';

export default class forgotPasswordControllers {

  public async execute(request: Request, response: Response): Promise<Response> {

    const services = new ForgotPasswordServices();

    const result = await services.execute(request.body);

    return response.json(result);

  };

};