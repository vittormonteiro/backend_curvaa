import { Request, Response } from 'express';
import ReadNotificationServices from '../services/Notification/readNotificationServices';

export default class notificationController {

  public async show(request: Request, response: Response): Promise<Response> {

    const uuidusuario = request.user.uuidusuario;

    const services = new ReadNotificationServices();
      
    const result = await services.execute({uuidusuario});

    return response.json(result);

  };
    
};




