import { celebrate } from 'celebrate';
import { Router } from 'express';
import { ExpressAdapter } from '../../../presentation/adapters';
import { ScheduleController } from '../../../presentation/controllers/ScheduleController';
import { scheduleValidator } from '../validators/scheduleValidator';
import authMiddleware from '../middlewares/authMiddleware';

const scheduleRouter = Router();

scheduleRouter.use(authMiddleware);
scheduleRouter.get('/', celebrate(scheduleValidator.QUERY, {abortEarly: true}), ExpressAdapter.create(ScheduleController.find));
scheduleRouter.post('/', celebrate(scheduleValidator.BODY, {abortEarly: true}), ExpressAdapter.create(ScheduleController.register));
scheduleRouter.put('/', celebrate(scheduleValidator.UPDATE, {abortEarly: true}), ExpressAdapter.create(ScheduleController.update));

export { scheduleRouter };
