import { Controller } from '@/core/infra/controller'
import { CreateWorkspaceController } from '@/application/workspaces/use-cases/create-workspace/create-workspace.controller'
import { CreateWorkspace } from '@/application/workspaces/use-cases/create-workspace/create-workspace'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'

export function makeCreateWorkspaceController(): Controller {
  const prismaWorkspacesRepository = new PrismaWorkspacesRepository()
  const prismaUsersRepository = new PrismaUsersRepository()

  const createWorkspace = new CreateWorkspace(
    prismaWorkspacesRepository,
    prismaUsersRepository,
  )

  return new CreateWorkspaceController(createWorkspace)
}
