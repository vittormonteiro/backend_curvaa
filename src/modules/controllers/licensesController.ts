import { Request, Response } from 'express';
import PermissionValidation from '../services/middlewares/permissionValidation';
import ShowLicenseServices from '../services/Licenses/showLicenseServices';
import UpdateLicenseUserLimitServices from '../services/Licenses/updateLicenseUserLimitServices';

export default class licensesController {

  private static async allowed(request: Request, method: string): Promise<void> {
    const uuidusuario = request.user.uuidusuario;
    const uuidmodulo = "04ff5ae8-431d-4262-b966-7f12f09bdfcd";
    await PermissionValidation({ uuidusuario, uuidmodulo, method });
  };

  public async show(request: Request, response: Response): Promise<Response> {
    const services = new ShowLicenseServices();
    const result = await services.execute({ uuidlicenca: request.user.uuidlicenca });

    return response.json(result);
  };

  public async updateLimit(request: Request, response: Response): Promise<Response> {
    await licensesController.allowed(request, 'update');

    const services = new UpdateLicenseUserLimitServices();
    const result = await services.execute({
      uuidlicenca: request.user.uuidlicenca,
      limite_usuarios: request.body.limite_usuarios,
      user_at: request.user.uuidusuario,
    });

    return response.status(201).json(result);
  };

}
