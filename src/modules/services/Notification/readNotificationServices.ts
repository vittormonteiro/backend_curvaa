import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/notificationRepository';

interface RequestDTO {
  uuidusuario: string;
};

export default class readNotificationServices {

  public async execute({uuidusuario}:RequestDTO): Promise<view[]> {

    return await repositoryView.findBy({uuidusuario: uuidusuario});

  };

};