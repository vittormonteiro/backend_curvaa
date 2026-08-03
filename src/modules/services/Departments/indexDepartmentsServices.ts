import { notFound } from "../../../shared/errors/errorFactories";
import {repository, entity} from '../../../shared/infra/typeorm/repositories/departmentsRepository';

interface IRequestDTO{
    uuiddeparta:string;
};

export default class indexDepartmentsServices {

    public async execute(uuiddeparta:IRequestDTO): Promise<entity> {

        const result = await repository.findOneBy(uuiddeparta);

        if(!result){
            throw notFound();
        }

        return result;

    };

};
