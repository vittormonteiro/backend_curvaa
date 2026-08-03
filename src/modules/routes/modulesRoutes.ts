import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/modulesController';

const router = Router();
router.use(isAutentication);

const controller = new Controller();

router.get('/:uuidmodulo', celebrate({
  [Segments.PARAMS]:{
    uuidmodulo: Joi.string().uuid().required()
}}), controller.index);

router.get('/',  controller.show);

export default router;
