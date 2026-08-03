import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Variável de ambiente ${name} não definida.`);
  }

  return value;
}

export const env = {
  HOST: getEnv('HOST'),
  PORT: getEnv('PORT'),
  DB_HOST: getEnv('DB_HOST'),
  DB_PORT: getEnv('DB_PORT'),
  DB_USER: getEnv('DB_USER'), 
  DB_PASS: getEnv('DB_PASS'),
  DB_NAME: getEnv('DB_NAME'),
  MAIL_DRIVER: getEnv('MAIL_DRIVER'),
  MAIL_HOST: getEnv('MAIL_HOST'),
  MAIL_PORT: getEnv('MAIL_PORT'),
  MAIL_USER: getEnv('MAIL_USER'),
  MAIL_PASS: getEnv('MAIL_PASS'),
  MAIL_FROM_NAME: getEnv('MAIL_FROM_NAME'),
  MAIL_FROM_EMAIL: getEnv('MAIL_FROM_EMAIL')
};