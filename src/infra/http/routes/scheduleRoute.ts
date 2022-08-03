import { celebrate } from 'celebrate';
import { Router } from 'express';
import { ExpressAdapter } from '../../../presentation/adapters';
import { ScheduleController } from '../../../presentation/controllers/ScheduleController';
import { scheduleValidator } from '../validators/scheduleValidator';
import authMiddleware from '../middlewares/authMiddleware';

const scheduleRouter = Router();

scheduleRouter.use(authMiddleware);
scheduleRouter.get('/:id', celebrate(scheduleValidator.QUERY, { abortEarly: true }), ExpressAdapter.create(ScheduleController.findById));
scheduleRouter.post('/', celebrate(scheduleValidator.BODY, { abortEarly: true }), ExpressAdapter.create(ScheduleController.register));
scheduleRouter.put('/book/:id', celebrate(scheduleValidator.UPDATE, { abortEarly: true }), ExpressAdapter.create(ScheduleController.update));
scheduleRouter.delete('/:id', celebrate(scheduleValidator.DELETE, { abortEarly: true }), ExpressAdapter.create(ScheduleController.delete));

export { scheduleRouter };
