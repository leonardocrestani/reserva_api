import { Router } from 'express';
import { ExpressAdapter } from '../../../presentation/adapters';
import { CourtController } from '../../../presentation/controllers/CourtController';

const courtRouter = Router();

courtRouter.post('/', ExpressAdapter.create(CourtController.register));
courtRouter.get('/', ExpressAdapter.create(CourtController.find));

export { courtRouter };
