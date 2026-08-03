import { Router } from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/permissionsController';

const router = Router();
router.use(isAutentication);
const controller = new Controller();

router.post('/create', celebrate({
    [Segments.BODY]:{
        uuidusuario: Joi.string().uuid().required(),
        uuidmodulo: Joi.string().required(),
    }
}),  controller.create);

router.put('/', celebrate({
    [Segments.BODY]:{
        uuidpermissao: Joi.string().uuid().required(),
        create: Joi.boolean().required(),
        read: Joi.boolean().required(),
        update: Joi.boolean().required(),
        delete: Joi.boolean().required(),
    }
}), controller.update);

router.delete('/:uuidpermissao', celebrate({
    [Segments.PARAMS]:{
        uuidpermissao: Joi.string().uuid().required(),
    }
}), controller.delete);

router.get('/:uuidpermissao', celebrate({
    [Segments.PARAMS]:{
        uuidpermissao: Joi.string().uuid().required(),
    }
}), controller.index);

router.get('/', controller.show);

export default router;
