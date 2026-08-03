import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/usersRepository';

export default  class showUsersServices {

  public async execute(): Promise<view[]> {

      return await repositoryView.find();

  };

};