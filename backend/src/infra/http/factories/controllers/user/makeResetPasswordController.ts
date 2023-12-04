import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { Controller } from '@/core/infra/controller'
import { ResetPassword } from '@/application/users/use-cases/reset-password/reset-password'
import { ResetPasswordController } from '@/application/users/use-cases/reset-password/reset-password.controller'

export function makeResetPasswordController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const resetPassword = new ResetPassword(prismaUsersRepository)

  const validator = new ValidatorCompositor([])

  return new ResetPasswordController(validator, resetPassword)
}
