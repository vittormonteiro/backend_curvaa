import { Router } from 'express';
import { celebrate,Joi,Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '../../shared/config/upload';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/worksControllers';

const router = Router();
router.use(isAutentication);
const controller = new Controller();
const upload = multer(uploadConfig.multer);

router.post('/create', celebrate({
    [Segments.BODY]:{
        _uuid: Joi.string().uuid().allow(null),
        status: Joi.string().optional().uppercase().default("ATIVO"),
        codigo: Joi.string().required(),
        titulo: Joi.string().required(),
        escopo: Joi.string().required(),
        foto: Joi.string().optional().allow(null).empty(''),
        data: Joi.string().required(),
        previsao: Joi.string().required(),
        dt_fim: Joi.string().optional().allow(null),
        uuidcliente: Joi.string().uuid().required(),
        valor: Joi.number().required(),
    }
}), controller.create);

router.post('/read', celebrate({
    [Segments.BODY]:{
        codigo:Joi.string().optional().allow(null),
        _uuid:Joi.string().uuid().optional().allow(null),
        status:Joi.string().optional().uppercase()
    }
}), controller.read);

router.get('/last', controller.last);

router.get('/dashboard', controller.dashboard);

router.patch('/photo', upload.single('file'), celebrate({
    [Segments.BODY]:{
        _uuid: Joi.string().uuid().required(),
    }
}), controller.uploadPhoto);

router.put('/', celebrate({
    [Segments.BODY]:{
        _uuid: Joi.string().uuid().required(),
        status: Joi.string().optional().uppercase(),
        codigo: Joi.string().required(),
        titulo: Joi.string().required(),
        escopo: Joi.string().required(),
        foto: Joi.string().optional().allow(null).empty(''),
        data: Joi.string().required(),
        previsao: Joi.string().required(),
        dt_fim: Joi.string().optional().allow(null),
        uuidcliente: Joi.string().uuid().required(),
        uuidlicenca: Joi.string().uuid().required(),
        valor: Joi.number().required(),
    }
}), controller.update);

router.delete('/:_uuid', celebrate({
    [Segments.PARAMS]:{
        _uuid: Joi.string().uuid().required(),   
}}), controller.delete);

router.get('/:_uuid', celebrate({
    [Segments.PARAMS]:{
        _uuid: Joi.string().uuid().required(),
}}), controller.index);

router.get('/', controller.show);

/*
router.put('/teams', celebrate({
    [Segments.BODY]:{
        uuid:Joi.string().required(),
        equipe: Joi.array().required(),
        equipe_outro: Joi.string().optional().uppercase().allow(null),
    }
}), controller.updateTeams);
*/

export default router;
