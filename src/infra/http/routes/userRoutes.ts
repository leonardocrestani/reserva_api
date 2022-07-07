import { Router } from 'express';
import { celebrate } from 'celebrate';
import { ExpressAdapter } from '../../../adapters';
import { UserController } from '../../../controllers';
import { userValidator } from '../validators/userValidator';

const userRouter = Router();

userRouter.get('/', celebrate(userValidator.QUERY), ExpressAdapter.create(UserController.findOne));
userRouter.post('/', celebrate(userValidator.BODY, { abortEarly: true }), ExpressAdapter.create(UserController.register));

export { userRouter };
