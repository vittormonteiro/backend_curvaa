import { Router } from 'express';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/sessionController';

const router = Router();
router.use(isAutentication);

const controller = new Controller();

router.get('/', controller.delete);

export default router;