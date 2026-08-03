import { repositoryView, view } from '../../../shared/infra/typeorm/repositories/worksRepository';

export default class showProjectsServices {

    public async execute(): Promise<view[]> {

        return await repositoryView.find();;

    }

};
