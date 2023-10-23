import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { ListWorkspace } from '@/application/workspaces/use-cases/list-workspace/list-workspace'
import { ListWorkspaceController } from '@/application/workspaces/use-cases/list-workspace/list-workspace.controller'
import { Controller } from '@/core/infra/controller'

export function makeListWorkspaceController(): Controller {
  const prismaWorkspacesRepository = new PrismaWorkspacesRepository()
  const listWorkspace = new ListWorkspace(prismaWorkspacesRepository)

  return new ListWorkspaceController(listWorkspace)
}
