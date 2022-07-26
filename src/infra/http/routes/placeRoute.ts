import { celebrate } from 'celebrate';
import { Router } from 'express';
import { ExpressAdapter } from '../../../presentation/adapters';
import { PlaceController } from '../../../presentation/controllers';
import { placeValidator } from '../validators/placeValidator';
import authMiddleware from '../middlewares/authMiddleware';

const placeRouter = Router();

//placeRouter.use(authMiddleware);
placeRouter.get('/', ExpressAdapter.create(PlaceController.findAll));
placeRouter.get('/:place_name', celebrate(placeValidator.PARAMS, { abortEarly: true }), ExpressAdapter.create(PlaceController.findOne));
placeRouter.post('/', celebrate(placeValidator.BODY, { abortEarly: true }), ExpressAdapter.create(PlaceController.register));

export { placeRouter };
