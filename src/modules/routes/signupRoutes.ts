import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Controller from '../controllers/signupController';

const router = Router();
const controller = new Controller();

router.post('/license', celebrate({
  [Segments.BODY]: {
    cliente: Joi.string().required().uppercase(),
    razao_social: Joi.string().required().uppercase(),
    cpf_cnpj: Joi.string().required().replace(/[.\-/]/g, ''),
    email: Joi.string().email().required(),
    contato: Joi.string().optional().allow(null).replace(/\D/g, ''),
    admin_nome: Joi.string().required().uppercase(),
    admin_login: Joi.string().required(),
    admin_email: Joi.string().email().required(),
    admin_cpf: Joi.string().required().replace(/[.\-/]/g, ''),
    admin_senha: Joi.string().min(6).required(),
    limite_usuarios: Joi.number().integer().min(1).optional(),
  }
}), controller.createLicense);

router.post('/user', celebrate({
  [Segments.BODY]: {
    chave: Joi.string().required().trim().uppercase(),
    usuario: Joi.string().required().uppercase(),
    login: Joi.string().required(),
    email: Joi.string().email().required(),
    cpf: Joi.string().required().replace(/[.\-/]/g, ''),
    senha: Joi.string().min(6).required(),
    contato: Joi.string().optional().allow(null).replace(/\D/g, ''),
  }
}), controller.createUser);

export default router;
