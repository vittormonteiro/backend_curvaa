import { Request, Response } from 'express';
import CreateWorkDiaryServices from '../services/WorkDiary/createWorkDiaryServices';
import ReadWorkDiaryServices from '../services/WorkDiary/readWorkDiaryServices';
import IndexWorkDiaryServices from '../services/WorkDiary/indexWorkDiaryServices';
import UpdateWorkDiaryServices from '../services/WorkDiary/updateWorkDiaryServices';
import DeleteWorkDiaryServices from '../services/WorkDiary/deleteWorkDiaryServices';
import UploadWorkDiaryPhotosServices from '../services/WorkDiary/uploadWorkDiaryPhotosServices';

export default class workDiaryController {

  public async create(request: Request, response: Response): Promise<Response> {
    const services = new CreateWorkDiaryServices();

    request.body.user_at = request.user.uuidusuario;
    request.body.uuidlicenca = request.user.uuidlicenca;

    const result = await services.execute(request.body);

    return response.status(201).json(result);
  };

  public async read(request: Request, response: Response): Promise<Response> {
    const services = new ReadWorkDiaryServices();

    const result = await services.execute({
      uuidobra: request.body.uuidobra,
      uuidlicenca: request.user.uuidlicenca,
    });

    return response.json(result);
  };

  public async index(request: Request, response: Response): Promise<Response> {
    const services = new IndexWorkDiaryServices();

    const result = await services.execute({
      _uuid: request.params._uuid,
      uuidlicenca: request.user.uuidlicenca,
    });

    return response.json(result);
  };

  public async update(request: Request, response: Response): Promise<Response> {
    const services = new UpdateWorkDiaryServices();

    request.body.user_at = request.user.uuidusuario;
    request.body.uuidlicenca = request.user.uuidlicenca;

    const result = await services.execute(request.body);

    return response.status(201).json(result);
  };

  public async delete(request: Request, response: Response): Promise<Response> {
    const services = new DeleteWorkDiaryServices();

    await services.execute({
      _uuid: request.params._uuid,
      uuidlicenca: request.user.uuidlicenca,
    });

    return response.status(204).send();
  };

  public async uploadPhotos(request: Request, response: Response): Promise<Response> {
    const files = Array.isArray(request.files) ? request.files : [];

    const services = new UploadWorkDiaryPhotosServices();

    const result = await services.execute({
      _uuid: request.body._uuid,
      uuidlicenca: request.user.uuidlicenca,
      user_at: request.user.uuidusuario,
      files,
    });

    return response.status(201).json(result);
  };

};
