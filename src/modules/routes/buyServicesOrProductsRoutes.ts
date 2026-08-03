import { Router } from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import multer from 'multer';
import uploadConfig from '../../shared/config/upload';
import Controllers from '../controllers/buyServicesOrProductsController';
import isAutentication from '../services/middlewares/isAutentication';

const router = Router();
router.use(isAutentication);

const upload = multer(uploadConfig.multer);
const controller = new Controllers();

router.post('/create', celebrate({
    [Segments.BODY]:{
        uuidaquisicao: Joi.string().uuid().allow(null).disallow(),
        uuidfornecedor: Joi.string().required(),
        uuidprojetos: Joi.array().required(),
        porcentagens: Joi.array().required(),
        descricao: Joi.string().required(),
        situacao: Joi.string().allow(null).disallow(),
        valor: Joi.string().required(),
        parcelas_n: Joi.number().required(),
        tipo: Joi.string().required(),
        link: Joi.string().optional().allow(null)
}}), controller.create);

router.post('/read', celebrate({
    [Segments.BODY]:{
        uuidaquisicao: Joi.string().uuid().allow(null).optional(),
        situacao: Joi.string().allow(null).optional(),
}}), controller.read);

router.put('/', celebrate({
    [Segments.BODY]:{
        uuidaquisicao: Joi.string().uuid().required(),
        codigo: Joi.number().optional().allow(null),
        uuidfornecedor: Joi.string().required(),
        uuidprojetos: Joi.array().required(),
        porcentagens: Joi.array().required(),
        descricao: Joi.string().required(),
        situacao: Joi.string().allow(null).disallow(),
        valor: Joi.string().required(),
        parcelas_n: Joi.number().required(),
        tipo: Joi.string().required(),
        link: Joi.string().optional().allow(null)
}}), controller.update);

router.get('/:uuidaquisicao', celebrate({
    [Segments.PARAMS]:{
        uuidaquisicao: Joi.string().uuid().required()
}}), controller.index);

router.get('/', controller.show);

router.patch('/', upload.single('file'), celebrate({
    [Segments.BODY]:{
        uuidaquisicao: Joi.string().uuid().required(),
        field: Joi.string().required(),
        codigo_nf: Joi.string().optional().allow(null).empty('')
}}), controller.upload);

//EXTRAS
router.put('/approve', celebrate({
    [Segments.BODY]:{
        uuidaquisicao: Joi.string().uuid().required(),
        situacao: Joi.string().required(),
        obs: Joi.string().optional().allow(null)
    }
}), controller.approve);

router.put('/avaliation', celebrate({
    [Segments.BODY]:{
        uuidaquisicao: Joi.string().uuid().required(),
        avaliacao: Joi.number().required(),
        descricao_avaliacao: Joi.string().optional().allow(null),
        justificativa: Joi.boolean().optional().allow(null),
    }
}), controller.avaliate);

export default router;
