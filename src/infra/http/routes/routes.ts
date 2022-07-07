import { Router } from 'express';
import { userRouter } from './userRoutes';
import { errors } from 'celebrate';

const router = Router();

router.use('/api/users', userRouter);
router.use(errors());

export { router };