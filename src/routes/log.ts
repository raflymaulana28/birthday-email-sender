import { Router } from 'express';
import { LogController } from '../controllers/log';

const router = Router();
const logController = new LogController();

router.post('/log', logController.createLog.bind(logController));
router.get('/log', logController.getLogs.bind(logController));

export default router;