import {repository, entity} from '../../../shared/infra/typeorm/repositories/cepsRepository';

export default class readCepsServices {

    public async execute (cep:string): Promise<entity | null> {
        
        return await repository.findByCep(cep);

    }
    
};
