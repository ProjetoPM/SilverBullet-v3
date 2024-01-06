import { Controller } from '@/core/infra/controller'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { ListInvite } from '@/application/workspaces/use-cases/list-invite/list-invite'
import { ListInviteController } from '@/application/workspaces/use-cases/list-invite/list-workspace.controller'

export function makeListInviteController(): Controller {
  const prismaWorkspacesRepository = new PrismaWorkspacesRepository()
  const listInvite = new ListInvite(prismaWorkspacesRepository)

  return new ListInviteController(listInvite)
}
