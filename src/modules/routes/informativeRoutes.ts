import { Router } from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/informativeController';

const router = Router();
router.use(isAutentication);

const controller = new Controller();

router.post('/create', celebrate({
    [Segments.BODY]:{
        uuidcomunicado: Joi.string().uuid().required(),
        uuidusuario: Joi.string().uuid().required(),
        status: Joi.boolean().required(),
        comunicado: Joi.string().required(),
        data: Joi.string().optional(),
    }
}), controller.create);

router.post('/read', celebrate({
    [Segments.BODY]:{
        status: Joi.boolean().required(),
    }
}), controller.read);

router.put('/:uuidcomunicado', celebrate({
    [Segments.PARAMS]:{
        uuidcomunicado: Joi.string().uuid().required(),
    },
    [Segments.BODY]:{
        uuidcomunicado: Joi.string().uuid().disallow(),
        uuidusuario: Joi.string().uuid().disallow(),
        status: Joi.boolean().required(),
        comunicado: Joi.string().required(),
        data: Joi.string().disallow(),
    }
}), controller.update);

router.delete('/:uuidcomunicado', celebrate({
    [Segments.PARAMS]:{
        uuidcomunicado: Joi.string().uuid().required(),
    }
}), controller.delete);

router.get('/:uuidcomunicado', celebrate({
    [Segments.PARAMS]:{
        uuidcomunicado: Joi.string().uuid().required(),
    }
}), controller.index);

router.get('/', controller.show);

export default router;
