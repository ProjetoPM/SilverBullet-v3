import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeForgotPasswordController } from '../factories/controllers/user/makeForgotPasswordController'
import { makeResetPasswordController } from '../factories/controllers/user/makeResetPasswordController'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/controllers/middlewares/makeEnsureAuthenticated'

export const user = Router()

user.post('/forgot-password', adaptRoute(makeForgotPasswordController()))
user.post('/reset-password',adaptMiddleware(makeEnsureAuthenticated()), adaptRoute(makeResetPasswordController()))

