import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeCreateWorkspaceController } from '../factories/controllers/workspace/makeCreateWorkspaceController'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'

export const workspace = Router()

workspace.use(adaptMiddleware(makeEnsureAuthenticated()))

workspace.post('/new', adaptRoute(makeCreateWorkspaceController()))
