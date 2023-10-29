import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeCreateProjectCharterController } from '../factories/controllers/integration/project-charter/makeCreateProjectCharterController'
import { makeEnsureAuthenticated } from '../factories/controllers/middlewares/makeEnsureAuthenticated'
import { makeGetCurrentWorkspaceAndProject } from '../factories/controllers/middlewares/makeGetCurrentWorkspaceAndProject'
import { makeDeleteProjectController } from '../factories/controllers/project/makeDeleteProjectController'
import { makeEditProjectController } from '../factories/controllers/project/makeEditProjectController'
import { makeGetProjectController } from '../factories/controllers/project/makeGetProjectController'

export const projectCharter = Router()

projectCharter.use(adaptMiddleware(makeEnsureAuthenticated()))
projectCharter.use(adaptMiddleware(makeGetCurrentWorkspaceAndProject()))

projectCharter.post('/new', adaptRoute(makeCreateProjectCharterController()))
projectCharter.get('/:projectCharterId', adaptRoute(makeGetProjectController()))
projectCharter.put(
  '/:projectCharterId/edit',
  adaptRoute(makeEditProjectController()),
)
projectCharter.delete('/', adaptRoute(makeDeleteProjectController()))
