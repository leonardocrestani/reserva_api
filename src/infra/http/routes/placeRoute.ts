import { celebrate } from 'celebrate';
import { Router } from 'express';
import { ExpressAdapter } from '../../../presentation/adapters';
import { PlaceController } from '../../../presentation/controllers';
import { placeValidator } from '../validators/placeValidator';

const placeRouter = Router();

placeRouter.post('/', celebrate(placeValidator.BODY, { abortEarly: true }), ExpressAdapter.create(PlaceController.register));
placeRouter.get('/', ExpressAdapter.create(PlaceController.find));

export { placeRouter };
