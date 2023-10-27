import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/controllers/middlewares/makeEnsureAuthenticated'
import { makeCreateStakeholderController } from '../factories/controllers/stakeholder/makeCreateStakeholderController'

export const stakeholder = Router()

stakeholder.use(adaptMiddleware(makeEnsureAuthenticated()))

stakeholder.post(
  '/:projectId/project/new',
  adaptRoute(makeCreateStakeholderController()),
)
