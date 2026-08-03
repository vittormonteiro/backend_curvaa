import { notFound } from "../../../shared/errors/errorFactories";
import {view, repositoryView} from '../../../shared/infra/typeorm/repositories/usersRepository';

interface IRequest{
    uuidusuario: string;
};

export default class showProfileServices {

    public async execute({uuidusuario}:IRequest): Promise<view>{

        const result = await repositoryView.findOneBy({uuidusuario: uuidusuario});

        if(!result){
            throw notFound();
        }

        return result;

    };

};
