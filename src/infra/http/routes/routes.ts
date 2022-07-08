import { Router } from 'express';
import { authRouter } from './authRoute';
import { userRouter } from './userRoute';
import errorMiddleware from '../middlewares/errorMiddleware';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/users', userRouter);
router.use(errorMiddleware);

export { router };