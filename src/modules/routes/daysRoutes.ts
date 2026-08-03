import { Router } from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/daysController';

const router = Router();
const controller = new Controller();

router.use(isAutentication);

router.post('/create', celebrate({
    [Segments.BODY]:{
        uuiddiasuteis: Joi.string().uuid().optional().allow(null),
        ano: Joi.string().required(),
        //mes: Joi.string().required(),
        codigo: Joi.string().required(),
        dias: Joi.string().required(),
        quintodiautil: Joi.string().required(),
        feriados: Joi.string().optional().allow(null)
}}), controller.create);

router.post('/read', celebrate({
    [Segments.BODY]:{
        ano: Joi.string().required(),
        codigo: Joi.string().optional().allow(null),
}}), controller.read);

router.put('/', celebrate({
    [Segments.BODY]:{
        uuiddiasuteis: Joi.string().uuid().required(),
        ano: Joi.string().required(),
        //mes: Joi.string().required(),
        codigo: Joi.string().required(),
        dias: Joi.string().required(),
        quintodiautil: Joi.string().required(),
        feriados: Joi.string().optional().allow(null)
    }
}), controller.update);

router.delete('/:uuiddiasuteis', celebrate({
    [Segments.PARAMS]:{
        uuiddiasuteis:Joi.string().uuid().required()  
}}),  controller.delete);

router.get('/:uuiddiasuteis', celebrate({
    [Segments.PARAMS]:{
        uuiddiasuteis:Joi.string().uuid().required()  
}}),  controller.index);

router.get('/', controller.show);

export default router;
