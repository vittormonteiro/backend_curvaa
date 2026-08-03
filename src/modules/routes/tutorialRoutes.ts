import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/tutorialController';

const router = Router();
router.use(isAutentication);

const controller = new Controller();

router.post('/create', celebrate({
    [Segments.BODY]:{
        uuidmodulo: Joi.string().required(),
        skipped: Joi.boolean().required()
}}), controller.create);

router.post('/read', celebrate({
    [Segments.BODY]:{
        uuidmodulo: Joi.string().required()
}}), controller.read);

export default router;
