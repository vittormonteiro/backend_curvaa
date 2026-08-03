import { repository } from "../../../shared/infra/typeorm/repositories/licenseRepository";
import { repository as usersRepository } from "../../../shared/infra/typeorm/repositories/usersRepository";

interface IRequestDTO {
  uuidlicenca?: string;
}

export default class ShowLicenseServices {

  public async execute({ uuidlicenca }: IRequestDTO) {
    if (!uuidlicenca || ['undefined', 'null'].includes(String(uuidlicenca))) {
      return {
        uuidlicenca: null,
        uuidcliente: null,
        chave: null,
        status: null,
        limite_usuarios: 0,
        usuarios_cadastrados: 0,
      };
    }

    const license = await repository.findOneBy({ uuidlicenca });

    if (!license) {
      return {
        uuidlicenca,
        uuidcliente: null,
        chave: null,
        status: 'Nao encontrada',
        limite_usuarios: 0,
        usuarios_cadastrados: 0,
      };
    }

    const usersCount = await usersRepository.countActiveByLicense(uuidlicenca);

    return {
      uuidlicenca: license.uuidlicenca,
      uuidcliente: license.uuidcliente,
      chave: license.chave,
      status: license.status,
      limite_usuarios: license.limite_usuarios,
      usuarios_cadastrados: usersCount,
    };
  }

}
