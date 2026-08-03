import { Request, Response } from 'express';
import SignupServices from '../services/Signup/signupServices';

export default class signupController {

  public async createLicense(request: Request, response: Response): Promise<Response> {
    const services = new SignupServices();
    const result = await services.createLicense(request.body);

    return response.status(201).json(result);
  };

  public async createUser(request: Request, response: Response): Promise<Response> {
    const services = new SignupServices();
    const result = await services.createUser(request.body);

    return response.status(201).json(result);
  };

};
