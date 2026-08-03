import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/licensesController';

const router = Router();
router.use(isAutentication);

const controller = new Controller();

router.get('/', controller.show);

router.patch('/limit', celebrate({
  [Segments.BODY]: {
    limite_usuarios: Joi.number().integer().min(1).required(),
  }
}), controller.updateLimit);

export default router;
