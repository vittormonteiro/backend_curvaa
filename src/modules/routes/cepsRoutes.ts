import { Router } from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/cepsController';

const router = Router();
router.use(isAutentication);

const controller = new Controller();

router.post('/read', celebrate({
    [Segments.BODY]:{
        cep: Joi.string().required().replace(/\D/g, ''),
    }
}), controller.read);

export default router;
