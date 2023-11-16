import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeForgotPasswordController } from '../factories/controllers/user/makeForgotPasswordController'

export const user = Router()

user.post('/forgot-password', adaptRoute(makeForgotPasswordController()))
