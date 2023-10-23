import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateWorkspaceController } from '../factories/controllers/workspace/makeCreateWorkspaceController'
import { makeDeleteWorkspaceController } from '../factories/controllers/workspace/makeDeleteWorkspaceController'
import { makeEditWorkspaceController } from '../factories/controllers/workspace/makeEditWorkspaceController'
import { makeGetWorkspaceController } from '../factories/controllers/workspace/makeGetWorkspaceController'
import { makeListWorkspaceController } from '../factories/controllers/workspace/makeListWorkspaceController'

export const workspace = Router()

workspace.use(adaptMiddleware(makeEnsureAuthenticated()))

workspace.post('/new', adaptRoute(makeCreateWorkspaceController()))
workspace.put('/:workspaceId/edit', adaptRoute(makeEditWorkspaceController()))
workspace.get('/:workspaceId', adaptRoute(makeGetWorkspaceController()))
workspace.get('/', adaptRoute(makeListWorkspaceController()))
workspace.delete('/', adaptRoute(makeDeleteWorkspaceController()))
