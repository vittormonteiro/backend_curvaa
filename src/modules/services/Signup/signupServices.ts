import { hash } from "bcryptjs";
import { v4 as uuid } from 'uuid';
import { badRequest, conflict, notFound } from "../../../shared/errors/errorFactories";
import { env } from "../../../shared/config/env";
import EtherealMail from "../../../shared/config/mail/EtherealMail";
import { repository as clientsRepository } from "../../../shared/infra/typeorm/repositories/clientsRepository";
import { repository as licenseRepository } from "../../../shared/infra/typeorm/repositories/licenseRepository";
import { repository as modulesRepository } from "../../../shared/infra/typeorm/repositories/modulesRepository";
import { repository as permissionsRepository } from "../../../shared/infra/typeorm/repositories/permissionsRepository";
import { repository as usersRepository } from "../../../shared/infra/typeorm/repositories/usersRepository";

interface ICompanySignupDTO {
  cliente: string;
  razao_social: string;
  cpf_cnpj: string;
  email: string;
  contato?: string;
  admin_nome: string;
  admin_login: string;
  admin_email: string;
  admin_cpf: string;
  admin_senha: string;
  limite_usuarios?: number;
}

interface IUserSignupDTO {
  chave: string;
  usuario: string;
  login: string;
  email: string;
  cpf: string;
  senha: string;
  contato?: string;
}

const normalizeDocument = (value: string): string => {
  return String(value || '').replace(/[.\-/]/g, '');
};

const buildLicenseKey = (): string => {
  return uuid().replace(/-/g, '').slice(0, 16).toUpperCase();
};

const normalizeUserLimit = (value?: number): number => {
  const limit = Number(value || 5);
  return Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 5;
};

const getDefaultUser = async (object: {
  uuidusuario?: string;
  uuidlicenca: string;
  usuario: string;
  login: string;
  email: string;
  cpf: string;
  senha: string;
  contato?: string;
  user_at?: string;
}) => {
  return usersRepository.create({
    uuidusuario: object.uuidusuario || uuid(),
    uuidlicenca: object.uuidlicenca,
    usuario: object.usuario.toUpperCase(),
    login: object.login,
    email: object.email,
    senha: await hash(object.senha, 8),
    contato: object.contato || undefined,
    cpf: normalizeDocument(object.cpf),
    status: 'Ativo',
    last_log: undefined,
    termos_uso: false,
    user_at: object.user_at || object.uuidusuario,
    token_at: '',
    login_attempts: 0,
    access_locked_at: null,
  } as any);
};

const validateUserUniqueness = async ({ login, email, cpf }: { login: string; email: string; cpf: string }) => {
  if (await usersRepository.findByLogin(login)) {
    throw conflict(`Login ${login} ja existe.`);
  }

  if (await usersRepository.findByEmail(email)) {
    throw conflict(`Email ${email} ja existe.`);
  }

  if (await usersRepository.findByCPF(normalizeDocument(cpf))) {
    throw conflict(`CPF ${cpf} ja existe.`);
  }
};

const sendLicenseKeyEmail = async (
  to: string,
  company: string,
  licenseKey: string,
  userLimit: number,
): Promise<void> => {
  await EtherealMail.sendMail({
    to: {
      name: company,
      email: to,
    },
    from: {
      name: env.MAIL_FROM_NAME,
      email: env.MAIL_FROM_EMAIL,
    },
    subject: 'Chave de licenca - Curva A',
    templateData: {
      file: '',
      variables: {},
    },
    body: `
      <p>Ola,</p>
      <p>A licenca da empresa <strong>${company}</strong> foi criada com sucesso.</p>
      <p>Use a chave abaixo para cadastrar os demais usuarios vinculados a esta licenca:</p>
      <p style="font-size:20px;font-weight:bold;letter-spacing:2px;background:#f1f4f2;padding:12px;border-radius:4px;">${licenseKey}</p>
      <p>Limite contratado: <strong>${userLimit} usuarios</strong>.</p>
      <p>Guarde essa chave com seguranca e compartilhe apenas com usuarios autorizados.</p>
    `,
  });
};

const grantAdminPermissions = async (uuidusuario: string): Promise<void> => {
  const modules = await modulesRepository.find();
  const permissions = modules.map((module) => permissionsRepository.create({
    uuidusuario,
    uuidmodulo: module.uuidmodulo,
    create: true,
    read: true,
    update: true,
    delete: true,
    user_at: uuidusuario,
  }));

  if (permissions.length) {
    await permissionsRepository.save(permissions);
  }
};

export default class SignupServices {

  public async createLicense(object: ICompanySignupDTO) {
    const cpf_cnpj = normalizeDocument(object.cpf_cnpj);
    const adminCpf = normalizeDocument(object.admin_cpf);
    const limite_usuarios = normalizeUserLimit(object.limite_usuarios);

    if (await clientsRepository.findOneBy({ cpf_cnpj })) {
      throw conflict(`CNPJ/CPF ${object.cpf_cnpj} ja existe.`);
    }

    await validateUserUniqueness({
      login: object.admin_login,
      email: object.admin_email,
      cpf: adminCpf,
    });

    const uuidusuario = uuid();
    const client = clientsRepository.create({
      categoria: 'CLIENTE',
      cliente: object.cliente,
      email: object.email,
      contato: object.contato || undefined,
      razao_social: object.razao_social,
      cpf_cnpj,
      status: true,
      user_at: uuidusuario,
    });

    const savedClient = await clientsRepository.save(client as any);
    const license = licenseRepository.create({
      empresa: object.cliente,
      razao_social: object.razao_social,
      cnpj: cpf_cnpj,
      ctt_empresa: object.contato || '',
      email_empresa: object.email,
      nm_assin: object.admin_nome,
      ctt_assin: object.contato || '',
      email_assin: object.admin_email,
      chave: buildLicenseKey(),
      limite_usuarios,
      status: true,
      user_at: uuidusuario,
    });
    const savedLicense = await licenseRepository.save(license);

    const admin = await getDefaultUser({
      uuidusuario,
      uuidlicenca: savedLicense.uuidlicenca,
      usuario: object.admin_nome,
      login: object.admin_login,
      email: object.admin_email,
      cpf: adminCpf,
      senha: object.admin_senha,
      contato: object.contato,
      user_at: uuidusuario,
    });

    await usersRepository.save(admin as any);
    await grantAdminPermissions(uuidusuario);
    await sendLicenseKeyEmail(object.email, object.razao_social || object.cliente, savedLicense.chave, savedLicense.limite_usuarios);

    return {
      uuidlicenca: savedLicense.uuidlicenca,
      uuidcliente: savedClient.uuidcliente,
      uuidusuario,
      chave: savedLicense.chave,
      limite_usuarios: savedLicense.limite_usuarios,
      usuarios_cadastrados: 1,
    };
  }

  public async createUser(object: IUserSignupDTO) {
    const license = await licenseRepository.findByKey(object.chave);

    if (!license) {
      throw notFound('Chave de licenca invalida ou inativa.');
    }

    if (!object.senha || object.senha.length < 6) {
      throw badRequest('Senha deve ter pelo menos 6 caracteres.');
    }

    const usersCount = await usersRepository.countActiveByLicense(license.uuidlicenca);
    if (usersCount >= license.limite_usuarios) {
      throw badRequest(`Limite de usuarios da licenca atingido (${usersCount}/${license.limite_usuarios}).`);
    }

    await validateUserUniqueness({
      login: object.login,
      email: object.email,
      cpf: object.cpf,
    });

    const user = await getDefaultUser({
      uuidlicenca: license.uuidlicenca,
      usuario: object.usuario,
      login: object.login,
      email: object.email,
      cpf: object.cpf,
      senha: object.senha,
      contato: object.contato,
    });

    const saved = await usersRepository.save(user as any);

    return {
      uuidusuario: saved.uuidusuario,
      uuidlicenca: saved.uuidlicenca,
      login: saved.login,
      email: saved.email,
      limite_usuarios: license.limite_usuarios,
      usuarios_cadastrados: usersCount + 1,
    };
  }

}
