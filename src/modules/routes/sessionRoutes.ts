import { Router } from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/sessionController';

const router = Router();
const controller = new Controller();

router.post('/read', celebrate({
    [Segments.BODY] :{
        login: Joi.string().required().trim(),
        senha: Joi.string().required().trim()
}}), controller.create);

router.post('/repair/read', celebrate({
    [Segments.BODY] :{
       email : Joi.string().required(),
       password : Joi.string().disallow().allow(null),
       password2: Joi.string().disallow().allow(null)
    }
}), controller.repairpass); 

router.put('/repair/:token', celebrate({
    [Segments.PARAMS]:{
        token:Joi.string().required(),
    },  
    [Segments.BODY] :{
       email : Joi.string().disallow().allow(null),
       password : Joi.string().required(),
       password2: Joi.string().required()
    }
}), controller.repairpassUpdate); 

router.use(isAutentication);

router.delete('/', controller.delete);

export default router;