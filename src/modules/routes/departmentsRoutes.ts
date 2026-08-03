import { Router } from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/departmentsController';

const router = Router();
router.use(isAutentication);

const controller = new Controller();

router.post('/create',  celebrate({
    [Segments.BODY]:{
        uuiddeparta: Joi.string().uuid().optional().allow(null),
        departamento:Joi.string().uppercase().required(),
        descricao:Joi.string().required().allow(null),
        uuidsupervisor:Joi.string().uuid().required(),
        status:Joi.boolean().required()
}}), controller.create);

router.post('/read', celebrate({
    [Segments.BODY]:{
        status:Joi.string().required()
}}), controller.read);

router.put('/', celebrate({
    [Segments.BODY]:{
        uuiddeparta: Joi.string().uuid().required(),
        departamento:Joi.string().uppercase().required(),
        descricao:Joi.string().required().allow(null),
        uuidsupervisor:Joi.string().uuid().required(),
        status:Joi.boolean().required()
    }
}), controller.update);


router.delete('/:uuiddeparta', celebrate({
    [Segments.PARAMS]:{
        uuiddeparta: Joi.string().uuid().required(),
    }
}), controller.delete);


router.get('/:uuiddeparta', celebrate({
    [Segments.PARAMS]:{
        uuiddeparta:Joi.string().uuid().required()
}}), controller.index);

router.get('/', controller.show);

export default router;
