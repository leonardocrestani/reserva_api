import { Router } from 'express';
import { celebrate } from 'celebrate';
import { ExpressAdapter } from '../../../presentation/adapters';
import { UserController } from '../../../presentation/controllers';
import { userValidator } from '../validators/userValidator';
import authMiddleware from '../middlewares/authMiddleware';

const userRouter = Router();

userRouter.post('/', celebrate(userValidator.BODY, { abortEarly: true }), ExpressAdapter.create(UserController.register));
userRouter.use(authMiddleware);
userRouter.get('/:email', celebrate(userValidator.QUERY, { abortEarly: true }), ExpressAdapter.create(UserController.findByEmail));
userRouter.put('/:email', celebrate(userValidator.UPDATE, { abortEarly: true }), ExpressAdapter.create(UserController.update));
userRouter.delete('/:email', celebrate(userValidator.DELETE, { abortEarly: true }), ExpressAdapter.create(UserController.delete));

export { userRouter };
