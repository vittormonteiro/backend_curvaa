import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/usersController';

const router = Router();
router.use(isAutentication);

const controller = new Controller();

const userPayload = {
  uuidusuario: Joi.string().allow(null).uuid(),
  usuario: Joi.string().required().uppercase(),
  login: Joi.string().required(),
  email: Joi.string().email().required(),
  cpf: Joi.string().required().replace(/[.\-/]/g, ''),
  contato: Joi.string().optional().allow(null).replace(/\D/g, ''),
  senha: Joi.string().optional().allow(null).min(6),
  status: Joi.string().required(),
  termos_uso: Joi.boolean().optional().allow(null),
};

router.post('/create', celebrate({
  [Segments.BODY]: userPayload,
}), controller.create);

router.post('/read', celebrate({
  [Segments.BODY]: {
    uuidusuario: Joi.string().uuid().optional().allow(null).trim(),
    status: Joi.string().optional().allow(null).trim(),
    doc: Joi.string().optional().allow(null).trim(),
  }
}), controller.read);

router.put('/', celebrate({
  [Segments.BODY]: {
    ...userPayload,
    uuidusuario: Joi.string().uuid().required(),
  },
}), controller.update);

router.delete('/:uuidusuario', celebrate({
  [Segments.PARAMS]: {
    uuidusuario: Joi.string().required(),
  }
}), controller.delete);

router.get('/:uuidusuario', celebrate({
  [Segments.PARAMS]: {
    uuidusuario: Joi.string().required(),
  }
}), controller.index);

router.get('/', controller.show);

export default router;
