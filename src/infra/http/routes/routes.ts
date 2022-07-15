import { Router } from 'express';
import { authRouter } from './authRoute';
import { userRouter } from './userRoute';
import { placeRouter } from './placeRoute';
import { courtRouter } from './courtRoute';
import { scheduleRouter } from './scheduleRoute';
import errorMiddleware from '../middlewares/errorMiddleware';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/users', userRouter);
router.use('/api/places', placeRouter);
router.use('/api/courts', courtRouter);
router.use('/api/schedules', scheduleRouter);
router.use(errorMiddleware);

export { router };