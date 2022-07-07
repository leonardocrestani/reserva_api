import { Router } from 'express';
import { celebrate } from 'celebrate';
import { ExpressAdapter } from '../../../adapters';
import { UserController } from '../../../controllers';
import { userValidator } from '../validators/userValidator';

const userRouter = Router();

userRouter.post('/', celebrate(userValidator.BODY), ExpressAdapter.create(UserController.register));

export { userRouter };
