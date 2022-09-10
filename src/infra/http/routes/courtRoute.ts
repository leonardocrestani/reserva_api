import { celebrate } from 'celebrate'
import { Router } from 'express'
import { ExpressAdapter } from '../../../presentation/adapters'
import { CourtController } from '../../../presentation/controllers/CourtController'
import { courtValidator } from '../validators/courtValidator'
import authMiddleware from '../middlewares/authMiddleware'

const courtRouter = Router()

courtRouter.use(authMiddleware)
courtRouter.get('/:id', celebrate(courtValidator.QUERY, { abortEarly: true }), ExpressAdapter.create(CourtController.findById))
courtRouter.post('/', celebrate(courtValidator.BODY, { abortEarly: true }), ExpressAdapter.create(CourtController.register))
courtRouter.put('/:id', celebrate(courtValidator.UPDATE, { abortEarly: true }), ExpressAdapter.create(CourtController.update))
courtRouter.delete('/:id', celebrate(courtValidator.DELETE, { abortEarly: true }), ExpressAdapter.create(CourtController.delete))

export { courtRouter }
