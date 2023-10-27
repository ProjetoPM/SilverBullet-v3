import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/controllers/middlewares/makeEnsureAuthenticated'
import { makeCreateStakeholderEngagementPlanController } from '../factories/controllers/stakeholder-engagement-plan/makeCreateStakeholderEngagementPlanController'

export const stakeholderEngagementPlan = Router()

stakeholderEngagementPlan.use(adaptMiddleware(makeEnsureAuthenticated()))

stakeholderEngagementPlan.post(
  '/:stakeholderId/stakeholder/new',
  adaptRoute(makeCreateStakeholderEngagementPlanController()),
)
