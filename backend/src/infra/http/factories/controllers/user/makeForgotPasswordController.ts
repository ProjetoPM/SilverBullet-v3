import { CreateUser } from '@/application/users/use-cases/create-user/create-user'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { CreateUserController } from '@/application/users/use-cases/create-user/create-user.controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { Controller } from '@/core/infra/controller'
import { ForgotPassword } from '@/application/users/use-cases/forgot-password/forgot-password'
import { NodeMailerService } from '@/infra/providers/implementations/nodemailer.service'
import { ForgotPasswordControler } from '@/application/users/use-cases/forgot-password/forgot-password.controller'

export function makeForgotPasswordController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const nodemailerService = new NodeMailerService()
  const forgotPassword = new ForgotPassword(prismaUsersRepository, nodemailerService)

  const validator = new ValidatorCompositor([])

  return new ForgotPasswordControler(validator, forgotPassword)
}
