import { Router } from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/activitiesController';

const router = Router();
router.use(isAutentication);
const controller = new Controller();

router.post('/create', celebrate({
    [Segments.BODY]:{
        _uuid: Joi.string().uuid().allow(null),
        etapa:Joi.string().required(),
        atividade: Joi.string().required(),
        descricao: Joi.string().optional().allow(null),
        status: Joi.boolean().required(),
        uuidobra: Joi.string().uuid().required(),
        uuidatividade_pai: Joi.string().uuid().optional().allow(null),
        dependencias: Joi.array().items(Joi.string().uuid()).optional(),
        dt_inicio: Joi.string().required(),
        tempo: Joi.number().required(),
        dt_fim: Joi.string().required().allow(null),
    }
}),  controller.create);

router.post('/read', celebrate({
    [Segments.BODY]:{
        status: Joi.boolean().optional().allow(null),
        uuidobra: Joi.string().uuid().optional().allow(null),
        uuidlicenca: Joi.string().uuid().optional().allow(null)
    }
}), controller.read);

router.post('/import', celebrate({
    [Segments.BODY]:{
        uuidobra: Joi.string().uuid().required(),
        activities: Joi.array().items(Joi.object({
            _uuid: Joi.string().uuid().optional().allow(null),
            etapa:Joi.string().required(),
            atividade: Joi.string().required(),
            descricao: Joi.string().optional().allow(null),
            status: Joi.boolean().required(),
            uuidatividade_pai: Joi.string().uuid().optional().allow(null),
            atividade_pai_ref: Joi.string().optional().allow(null, ''),
            dependencias: Joi.array().items(Joi.string().uuid()).optional(),
            dependencias_ref: Joi.array().items(Joi.string()).optional(),
            dt_inicio: Joi.string().required(),
            tempo: Joi.number().required(),
            dt_fim: Joi.string().required().allow(null),
        })).required(),
        uuidlicenca: Joi.string().uuid().optional().allow(null)
    }
}), controller.import);

router.put('/', celebrate({
    [Segments.BODY]:{
        _uuid: Joi.string().uuid().required(),
        etapa:Joi.string().required(),
        atividade: Joi.string().required(),
        descricao: Joi.string().optional().allow(null),
        status: Joi.boolean().required(),
        uuidobra: Joi.string().uuid().required(),
        uuidatividade_pai: Joi.string().uuid().optional().allow(null),
        dependencias: Joi.array().items(Joi.string().uuid()).optional(),
        dt_inicio: Joi.string().required(),
        tempo: Joi.number().required(),
        dt_fim: Joi.string().required().allow(null),
    }
}), controller.update);

router.delete('/:_uuid', 
celebrate({
    [Segments.PARAMS]:{
        _uuid: Joi.string().uuid().required(),
    }
}), controller.delete);

router.get('/:_uuid', 
celebrate({
    [Segments.PARAMS]:{
        _uuid: Joi.string().uuid().required(),
    }
}), controller.index);

router.get('/', controller.show);

export default router;
