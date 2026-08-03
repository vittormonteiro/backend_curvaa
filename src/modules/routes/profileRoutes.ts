import { Router } from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/profileController';

const router = Router()
const controller = new Controller();

router.use(isAutentication);

router.get('/', controller.index);

router.put('/', celebrate({
    [Segments.BODY] :{
        uuidusuario: Joi.string().uuid().disallow(),
        usuario: Joi.string().required().uppercase(),
        login: Joi.string().required(),
        email : Joi.string().required(),
        contato: Joi.string().optional().allow(null).replace(/\D/g, ''),
        cpf: Joi.string().replace(/[.\-/]/g, '').required(),
        termos_uso: Joi.boolean().required(),
}}), controller.update); 

router.get('/view', controller.show);

//router.patch('/', upload.single('file'),  controller.upload);

//extras
router.put('/reset', celebrate({
    [Segments.BODY] :{
        oldpass: Joi.string().required(),
        newpass: Joi.string().required(),
        renewpass: Joi.string().required()
}}), controller.reset); 

router.post('/acept/read', celebrate({
    [Segments.BODY] :{
        termos_uso: Joi.boolean().required()
}}), controller.acept); 

export default router;
