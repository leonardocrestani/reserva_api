import { Router } from 'express';
import { userRouter } from './userRoutes';
import errorMiddleware from '../middlewares/errorMiddleware';

const router = Router();

router.use('/api/users', userRouter);
router.use(errorMiddleware);

export { router };