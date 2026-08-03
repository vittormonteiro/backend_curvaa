import { notFound, forbidden } from "../../../shared/errors/errorFactories";
import {repository, entity} from '../../../shared/infra/typeorm/repositories/usersAvaliationRepository';

export default class updateUsersAvaliationServices {

    public async execute(object: entity): Promise<entity>{

        const uuidusuario = object.uuidusuario;

        const result = await repository.findOneBy({uuidusuario}) as entity | null;

        if(!result){
            throw notFound();
        }

        if(object.user_at !== result.uuidsupervisor){
            throw forbidden("Somente o supervisor poderá avalia-lo.");
        }

        object.aval_por = object.user_at;

        object.aval_data = new Date();
        object.aval_nota = object.aval_prazo + object.aval_tecnica + object.aval_relaciona + object.aval_proativ + object.aval_planej;

        return await repository.save(object);
        
    };

};

