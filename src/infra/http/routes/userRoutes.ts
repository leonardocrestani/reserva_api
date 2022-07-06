import { Router } from "express";
import { ExpressAdapter } from '../../../adapters';
import { UserController } from "../../../controllers";

const userRouter = Router();

userRouter.post('/', ExpressAdapter.create(UserController.register));

export { userRouter };
