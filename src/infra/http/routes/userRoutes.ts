import { Router } from "express";
import { ExpressAdapter } from '../../../adapters';
import { UserController } from '../../../controllers';
import registerValidator from '../validators/User/registerValidator';

const userRouter = Router();

userRouter.post('/', registerValidator, ExpressAdapter.create(UserController.register));

export { userRouter };
