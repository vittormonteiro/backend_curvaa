import { Request, Response } from 'express';
import PermissionValidation from '../services/middlewares/permissionValidation';
import CreateBuyServicesOrProductsServices  from  '../services/BuyServicesOrProducts/createBuyServicesOrProductsServices';
import ReadBuyServicesOrProductsServices  from  '../services/BuyServicesOrProducts/readBuyServicesOrProductsServices';
import UpdateBuyServicesOrProductsServices  from  '../services/BuyServicesOrProducts/updateBuyServicesOrProductsServices';
import IndexBuyServicesOrProductsServices   from '../services/BuyServicesOrProducts/indexBuyServicesOrProductsServices';
import ShowBuyServicesOrProductsServices    from  '../services/BuyServicesOrProducts/showBuyServicesOrProductsServices';
import UploadBuyServicesOrProductsServices  from  '../services/BuyServicesOrProducts/uploadBuyServicesOrProductsServices';
import ApproveBuyServicesOrProductsServices  from  '../services/BuyServicesOrProducts/approveBuyServicesOrProductsServices';
import AvaliateBuyServicesOrProductsServices  from  '../services/BuyServicesOrProducts/avaliateBuyServicesOrProductsServices';

export default class buyServicesOrProductsController {


  public async create(request: Request, response: Response): Promise<Response>{

    const service = new CreateBuyServicesOrProductsServices();

    request.body.uuidusuario = request.user.uuidusuario;

    request.body.user_at = request.user.uuidusuario;

    const result = await service.execute(request.body);

    return response.status(201).json(result);

  };

  public async read(request: Request, response: Response): Promise<Response>{

    const service = new ReadBuyServicesOrProductsServices();

    const result = await service.execute(request.body);

    return response.json(result);

  };

  public async update(request :Request, response:Response): Promise<Response>{

    request.body.user_at = request.user.uuidusuario;

    const services = new UpdateBuyServicesOrProductsServices();

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async index(request:Request, response:Response):Promise<Response>{

    const {uuidaquisicao} = request.params;
    const uuidusuario = request.user.uuidusuario;

    const services = new IndexBuyServicesOrProductsServices();
    const result = await services.execute({uuidaquisicao, uuidusuario});

    return response.json(result);
    
  };

  public async show(request: Request, response: Response): Promise<Response> {
    
    const services = new ShowBuyServicesOrProductsServices();

    const result = await services.execute();

    return response.json(result);

  };

  public async upload(request: Request, response: Response): Promise<Response> {

    request.body.user_at = request.user.uuidusuario;

    const services = new UploadBuyServicesOrProductsServices();

    if(request.file){

      request.body.filename = request.file.filename;
      const result = await services.execute(request.body);

      return response.status(201).json(result);
     
    }else{
      return response.status(409).json("Arquivo não enviado!");
    }


  };

  public async approve(request :Request, response:Response): Promise<Response>{

    request.body.user_at = request.user.uuidusuario;

    const services = new ApproveBuyServicesOrProductsServices();

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

  public async avaliate(request :Request, response:Response): Promise<Response>{

    request.body.avaliador = request.user.uuidusuario;
    request.body.user_at = request.user.uuidusuario;

    const services = new AvaliateBuyServicesOrProductsServices();

    const result = await services.execute(request.body);

    return response.status(201).json(result);

  };

};





