import { celebrate } from 'celebrate';
import { Router } from 'express';
import { ExpressAdapter } from '../../../presentation/adapters';
import { PlaceController } from '../../../presentation/controllers';
import { placeValidator } from '../validators/placeValidator';
import authMiddleware from '../middlewares/authMiddleware';

const placeRouter = Router();

placeRouter.use(authMiddleware);
placeRouter.get('/', celebrate(placeValidator.QUERY, { abortEarly: true }), ExpressAdapter.create(PlaceController.find));
placeRouter.post('/', celebrate(placeValidator.BODY, { abortEarly: true }), ExpressAdapter.create(PlaceController.register));

export { placeRouter };
