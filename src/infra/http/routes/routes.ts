import { Router } from 'express';
import { userRouter } from './userRoutes';

const router = Router();

router.use('/api/users', userRouter);

export { router };