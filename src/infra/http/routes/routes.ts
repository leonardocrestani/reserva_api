import { Router } from 'express'
import { authRouter } from './authRoute'
import { userRouter } from './userRoute'
import { placeRouter } from './placeRoute'
import { courtRouter } from './courtRoute'
import { scheduleRouter } from './scheduleRoute'
import { errors } from 'celebrate'
import errorMiddleware from '../middlewares/errorMiddleware'

const router = Router()

router.use('/api/auth', authRouter)
router.use('/api/user', userRouter)
router.use('/api/place', placeRouter)
router.use('/api/court', courtRouter)
router.use('/api/schedule', scheduleRouter)
router.use(errors())
router.use(errorMiddleware)

export { router }
