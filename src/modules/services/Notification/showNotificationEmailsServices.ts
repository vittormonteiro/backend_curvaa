import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/notificationRepository';

export default class showNotificationEmailsServices {

  public async execute(): Promise<view[]> {

    return await repositoryView.findBy({sendemail: true});

  };

};