import { Request, Response } from 'express';
import CreateSessionsServices from '../services/Sessions/createSessionsServices';
import DeleteSessionsServices from '../services/Sessions/deleteSessionsServices';
import CreateUsersRepairServices  from '../services/UsersRepair/createUsersRepairServices';
import UpdateUsersRepairServices  from '../services/UsersRepair/updateUsersRepairServices';

export default class sessionController {

    public async create (request: Request, response: Response):Promise <Response>{

        const services = new CreateSessionsServices();

        const result = await services.execute(request.body);

        return response.json(result);
        
    }; 

    public async delete (request: Request, response: Response):Promise <Response>{

        const services = new DeleteSessionsServices();

        const uuidusuario = request.user.uuidusuario;
        
        const result = await services.execute({uuidusuario});

        return response.status(401).json(result);
        
    };

    public async repairpass(request: Request, response: Response): Promise<Response> {

        const services = new CreateUsersRepairServices();

        const email = request.body.email;

        const result = await services.execute(email);

        return response.status(202).json(result);

    };

    public async repairpassUpdate(request: Request, response: Response): Promise<Response> {

        const services = new UpdateUsersRepairServices();

        request.body.token = request.params.token;

        if(request.body.password !== request.body.password2){
            return response.status(409).json('Senhas não conferem.');
        }

        const result = await services.execute(request.body);

        return response.status(201).json(result);

    };
    
};