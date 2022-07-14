import { Router } from 'express';
import { ExpressAdapter } from '../../../presentation/adapters';
import { ScheduleController } from '../../../presentation/controllers/ScheduleController';

const scheduleRouter = Router();

scheduleRouter.post('/', ExpressAdapter.create(ScheduleController.register));

export { scheduleRouter };
