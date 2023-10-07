import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeCreateProjectController } from '../factories/controllers/project/makeCreateProjectController'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'

export const project = Router()

project.use(adaptMiddleware(makeEnsureAuthenticated()))

project.post(
  '/:workspaceId/workspaces/new',
  adaptRoute(makeCreateProjectController()),
)
