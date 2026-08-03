import { badRequest, notFound } from "../../../shared/errors/errorFactories";
import { repository } from "../../../shared/infra/typeorm/repositories/licenseRepository";
import { repository as usersRepository } from "../../../shared/infra/typeorm/repositories/usersRepository";

interface IRequestDTO {
  uuidlicenca: string;
  limite_usuarios: number;
  user_at: string;
}

export default class UpdateLicenseUserLimitServices {

  public async execute({ uuidlicenca, limite_usuarios, user_at }: IRequestDTO) {
    const license = await repository.findOneBy({ uuidlicenca });

    if (!license) {
      throw notFound('Licenca nao encontrada.');
    }

    const limit = Number(limite_usuarios);
    if (!Number.isInteger(limit) || limit < 1) {
      throw badRequest('Limite de usuarios invalido.');
    }

    const usersCount = await usersRepository.countActiveByLicense(uuidlicenca);
    if (limit < usersCount) {
      throw badRequest(`Limite nao pode ser menor que os usuarios ativos (${usersCount}).`);
    }

    await repository.updateUserLimit(uuidlicenca, limit, user_at);

    return {
      uuidlicenca,
      limite_usuarios: limit,
      usuarios_cadastrados: usersCount,
    };
  }

}
