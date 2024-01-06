import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeCheckRoles } from '../factories/controllers/middlewares/makeCheckRoles'
import { makeEnsureAuthenticated } from '../factories/controllers/middlewares/makeEnsureAuthenticated'
import { makeGetCurrentWorkspaceAndProject } from '../factories/controllers/middlewares/makeGetCurrentWorkspaceAndProject'
import { makeListInviteController } from '../factories/controllers/workspace/makeListInviteController'
import { makeSendInviteController } from '../factories/controllers/workspace/makeSendInviteController'

export const invites = Router()

invites.use(adaptMiddleware(makeEnsureAuthenticated()))
invites.use(adaptMiddleware(makeGetCurrentWorkspaceAndProject()))

invites.post(
  '/workspace',
  adaptMiddleware(
    makeCheckRoles({
      workspace: ['ADMIN'],
    }),
  ),
  adaptRoute(makeSendInviteController()),
)
invites.get('/workspace', adaptRoute(makeListInviteController()))
