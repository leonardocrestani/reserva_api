import { celebrate } from 'celebrate';
import { Router } from 'express';
import { ExpressAdapter } from '../../../presentation/adapters';
import { CourtController } from '../../../presentation/controllers/CourtController';
import { courtValidator } from '../validators/courtValidator';
import authMiddleware from '../middlewares/authMiddleware';

const courtRouter = Router();

//courtRouter.use(authMiddleware);
courtRouter.get('/', celebrate(courtValidator.QUERY, {abortEarly: true}), ExpressAdapter.create(CourtController.find));
courtRouter.post('/', celebrate(courtValidator.BODY, {abortEarly: true}), ExpressAdapter.create(CourtController.register));
courtRouter.put('/', celebrate(courtValidator.UPDATE, {abortEarly: true}), ExpressAdapter.create(CourtController.update))

export { courtRouter };
