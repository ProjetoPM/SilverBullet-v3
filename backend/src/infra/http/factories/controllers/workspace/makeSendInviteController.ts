import { Controller } from '@/core/infra/controller'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { SendInvite } from '@/application/workspaces/use-cases/send-invite/send-invite'
import { SendInviteController } from '@/application/workspaces/use-cases/send-invite/send-invite.controller'

export function makeSendInviteController(): Controller {
  const prismaWorkspacesRepository = new PrismaWorkspacesRepository()
  const prismaUsersRepository = new PrismaUsersRepository()

  const sendInvite = new SendInvite(
    prismaUsersRepository,
    prismaWorkspacesRepository,
  )

  const validator = new ValidatorCompositor([])

  return new SendInviteController(validator, sendInvite)
}
