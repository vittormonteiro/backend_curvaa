import { repositoryView, view } from '../../../shared/infra/typeorm/repositories/worksRepository';

export default class LastWorksServices {

    public async execute(uuidlicenca: string): Promise<view | null> {

        return await repositoryView.findLast(uuidlicenca);

    }

};
