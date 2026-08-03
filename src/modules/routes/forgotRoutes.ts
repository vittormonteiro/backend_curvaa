import { Router } from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import isAutentication from '../services/middlewares/isAutentication';
import ForgotPasswordController from '../controllers/forgotPasswordController';

const router = Router();
router.use(isAutentication);

const forgotPasswordControllers = new ForgotPasswordController();

router.post('/forgot',
    celebrate({[Segments.BODY] :{
        email: Joi.string().required()
    }
}), forgotPasswordControllers.execute);

export default router;













































