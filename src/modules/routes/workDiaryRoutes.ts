import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '../../shared/config/upload';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/workDiaryController';

const router = Router();
router.use(isAutentication);
const controller = new Controller();
const upload = multer(uploadConfig.multer);

const diaryBody = {
  _uuid: Joi.string().uuid().allow(null),
  uuidobra: Joi.string().uuid().required(),
  data_vistoria: Joi.string().required(),
  responsavel_local: Joi.string().required().uppercase(),
  descricao_atividade: Joi.string().required(),
  medicao: Joi.number().min(0).max(100).required(),
  observacao: Joi.string().optional().allow(null, ''),
};

router.post('/create', celebrate({
  [Segments.BODY]: diaryBody,
}), controller.create);

router.post('/read', celebrate({
  [Segments.BODY]: {
    uuidobra: Joi.string().uuid().required(),
  },
}), controller.read);

router.patch('/photos', upload.array('photos', 4), celebrate({
  [Segments.BODY]: {
    _uuid: Joi.string().uuid().required(),
  },
}), controller.uploadPhotos);

router.put('/', celebrate({
  [Segments.BODY]: {
    ...diaryBody,
    _uuid: Joi.string().uuid().required(),
  },
}), controller.update);

router.delete('/:_uuid', celebrate({
  [Segments.PARAMS]: {
    _uuid: Joi.string().uuid().required(),
  },
}), controller.delete);

router.get('/:_uuid', celebrate({
  [Segments.PARAMS]: {
    _uuid: Joi.string().uuid().required(),
  },
}), controller.index);

export default router;
