import { Router } from 'express'
import { ExpressAdapter } from '../../../presentation/adapters/ExpressAdapter'
import { AuthController } from '../../../presentation/controllers/AuthController'

const authRouter = Router()

authRouter.post('/', ExpressAdapter.create(AuthController.authenticate))

export { authRouter }
