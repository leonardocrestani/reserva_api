import { Router } from 'express';
import { ExpressAdapter } from '../../../presentation/adapters';
import { PlaceController } from '../../../presentation/controllers';

const placeRouter = Router();

placeRouter.post('/', ExpressAdapter.create(PlaceController.register));

export { placeRouter };
