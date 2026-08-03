import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/modulesRepository';

export default class showModulesServices {

  public async execute(): Promise<view[]> {

    return await repositoryView.find();

  };

};