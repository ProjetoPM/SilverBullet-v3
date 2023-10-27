import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/middlewares/makeEnsureAuthenticated'
import { makeCreateProjectController } from '../factories/controllers/project/makeCreateProjectController'
import { makeEditProjectController } from '../factories/controllers/project/makeEditProjectController'
import { makeListProjectController } from '../factories/controllers/project/makeListProjectController'
import { makeGetCurrentWorkspaceAndProject } from '../factories/controllers/middlewares/makeGetCurrentWorkspaceAndProject'

export const project = Router()

project.use(adaptMiddleware(makeEnsureAuthenticated()))
project.use(adaptMiddleware(makeGetCurrentWorkspaceAndProject()))

project.post('/new', adaptRoute(makeCreateProjectController()))
project.get('/', adaptRoute(makeListProjectController()))
project.put('/:projectId/edit', adaptRoute(makeEditProjectController()))
