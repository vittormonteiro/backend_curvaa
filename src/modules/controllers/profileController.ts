import { Request, Response } from 'express';
import UpdateProfileServices from '../services/Profile/updateProfileServices';
import indexProfileServices from '../services/Profile/indexProfileServices';
import ShowProfileServices from '../services/Profile/showProfileServices';
//import UploadFilesServices from '../services/Files/uploadFilesServices';
import ResetProfileServices from '../services/Profile/resetProfileServices';
import AceptProfileServices from '../services/Profile/aceptProfileServices';

export default class profileController {

  public async index(request: Request , response: Response){

    const uuidusuario = request.user.uuidusuario;

    const services = new indexProfileServices();

    const result = await services.execute({uuidusuario});

    return response.json(result);

  };

  public async update(request: Request, response: Response): Promise<Response> {
    
    request.body.uuidusuario = request.user.uuidusuario;

    const services = new UpdateProfileServices();

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async show(request: Request, response: Response){

    const uuidusuario = request.user.uuidusuario;

    const services = new ShowProfileServices();

    const result = await services.execute({uuidusuario});

    return response.json(result);

  };

  /*
  public async upload(request: Request, response: Response): Promise<Response> {

    const services = new UploadFilesServices();

    if(request.file){

      request.body.user_at = request.user.uuidusuario;
      request.body.uuidusuario = request.user.uuidusuario;
      request.body.filepath = request.file.filename;

      const result = await services.execute(request.body);

      return response.status(201).json(result);
      
    }else{
      return response.status(409).json("Arquivo não enviado!");
    }
    
  };
  */

  public async reset(request: Request, response: Response): Promise<Response> {
    
    const uuidusuario = request.user.uuidusuario;
    
    const {oldpass, newpass, renewpass} = request.body;

    const services = new ResetProfileServices();

    const result = await services.execute({uuidusuario, oldpass, newpass, renewpass});

    return response.status(201).json(result);

  };

  public async acept(request: Request, response: Response): Promise<Response> {
    
    request.body.uuidusuario = request.user.uuidusuario;

    const services = new AceptProfileServices();

    const result = await services.execute(request.body);

    return response.json(result);

  };

};




