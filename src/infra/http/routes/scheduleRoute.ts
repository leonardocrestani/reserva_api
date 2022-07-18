import { Router } from 'express';
import { ExpressAdapter } from '../../../presentation/adapters';
import { ScheduleController } from '../../../presentation/controllers/ScheduleController';

const scheduleRouter = Router();

scheduleRouter.get('/', ExpressAdapter.create(ScheduleController.find));
scheduleRouter.post('/', ExpressAdapter.create(ScheduleController.register));
scheduleRouter.put('/', ExpressAdapter.create(ScheduleController.update));

export { scheduleRouter };
