import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/middlewares/makeEnsureAuthenticated'
import { makeGetCurrentWorkspaceAndProject } from '../factories/controllers/middlewares/makeGetCurrentWorkspaceAndProject'
import { makeCreateWeeklyEvaluationController } from '../factories/controllers/weekly-evaluation/makeCreateWeeklyEvaluationController'
import { makeListWeeklyEvaluationController } from '../factories/controllers/weekly-evaluation/makeListWeeklyEvaluation'
import { makeListAvailableWeeklyEvaluationController } from '../factories/controllers/weekly-evaluation/makeListAvailableWeeklyEvaluation'

export const weeklyEvaluations = Router()

weeklyEvaluations.use(adaptMiddleware(makeEnsureAuthenticated()))
weeklyEvaluations.use(adaptMiddleware(makeGetCurrentWorkspaceAndProject()))

weeklyEvaluations.post(
  '/new',
  adaptRoute(makeCreateWeeklyEvaluationController())
)

weeklyEvaluations.get(
  '/',
  adaptRoute(makeListWeeklyEvaluationController())
)
weeklyEvaluations.get(
  '/available',
  adaptRoute(makeListAvailableWeeklyEvaluationController())
)
