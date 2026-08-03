import { Router } from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/clientsController';

const router = Router();
router.use(isAutentication);

const controller = new Controller();

router.post('/create', celebrate({
    [Segments.BODY]:{
        uuidcliente:Joi.string().uuid().allow(null),
        categoria:Joi.string().required(),
        cliente:Joi.string().required().uppercase(),
        email:Joi.string().optional().allow(null),
        contato:Joi.string().optional().allow(null),
        razao_social:Joi.string().optional().uppercase().allow(null),
        cpf_cnpj: Joi.string().required().replace(/\.|\-|\//g, ''),
        status:Joi.boolean().required(), 
    }
}), controller.create);

router.post('/read', celebrate({
    [Segments.BODY]:{
        status:Joi.string().optional().allow(null), 
        cpf_cnpj:Joi.string().optional().allow(null).replace(/\.|\-|\//g, '').trim(), 
        cliente:Joi.string().optional().allow(null).uppercase(),
        razao_social:Joi.string().optional().allow(null).uppercase(),
        nome:Joi.string().optional().allow(null).uppercase()
    }
}), controller.read);

router.put('/',celebrate({
    [Segments.BODY]:{
        uuidcliente:Joi.string().uuid().required(),
        categoria:Joi.string().required(),
        cliente:Joi.string().required().uppercase(),
        email:Joi.string().optional().allow(null),
        contato:Joi.string().optional().allow(null),
        razao_social:Joi.string().optional().uppercase().allow(null),
        cpf_cnpj: Joi.string().required().replace(/\.|\-|\//g, ''),
        status:Joi.boolean().required(), 
    }
}), controller.update);

router.delete('/:uuidcliente',celebrate({
    [Segments.PARAMS]:{
        uuidcliente: Joi.string().uuid().required(),
    }
}), controller.delete);

router.get('/:uuidcliente',celebrate({
    [Segments.PARAMS]:{
        uuidcliente: Joi.string().uuid().required(),
    }
}), controller.index);

//show
router.get('/', controller.show);

export default router;
