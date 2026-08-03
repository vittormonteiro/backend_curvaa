import {repository, entity} from '../../../shared/infra/typeorm/repositories/notificationRepository';

export default class createNotificationServices {

  public async execute(object:entity): Promise<string> {

    return repository.insertRows(object);

  };

};