import { Router } from 'express'
import { ExpressAdapter } from '../../../presentation/adapters'
import { healthCheckController } from '../../../presentation/controllers'

const healthCheckRoute = Router()

healthCheckRoute.get('/', ExpressAdapter.create(healthCheckController.health))

export { healthCheckRoute }
