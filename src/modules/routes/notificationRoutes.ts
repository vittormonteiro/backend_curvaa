import { Router } from 'express';
import isAutentication from '../services/middlewares/isAutentication';
import Controller from '../controllers/notificationController';

const router = Router();
router.use(isAutentication);

const controller = new Controller();

router.get('/',  controller.show);

export default router;
