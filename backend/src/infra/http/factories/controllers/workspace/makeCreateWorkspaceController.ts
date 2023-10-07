import { Controller } from '@/core/infra/controller'
import { CreateWorkspaceController } from '@/application/workspaces/use-cases/create-workspace/create-workspace.controller'
import { CreateWorkspace } from '@/application/workspaces/use-cases/create-workspace/create-workspace'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { PrismaUserWorkspacesRepository } from '@/application/user-workspaces/repositories/prisma/PrismaUserWorkspacesRepository'
import { CreateUserWorkspace } from '@/application/user-workspaces/use-cases/create-user-workspace/create-user-workspace'
import { CreateUserWorkspaceRoles } from '@/application/user-workspace-roles/use-cases/create-user-workspace-roles/create-user-workspace-roles'
import { PrismaUserWorkspaceRolesRepository } from '@/application/user-workspace-roles/repositories/prisma/PrismaUserWorkspaceRolesRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'

export function makeCreateWorkspaceController(): Controller {
  const prismaWorkspacesRepository = new PrismaWorkspacesRepository()
  const prismaUserWorkspacesRepository = new PrismaUserWorkspacesRepository()
  const prismaUserWorkspaceRolesRepository =
    new PrismaUserWorkspaceRolesRepository()
  const prismaUsersRepository = new PrismaUsersRepository()

  const createUserWorkspaceRoles = new CreateUserWorkspaceRoles(
    prismaUserWorkspaceRolesRepository,
  )
  const createUserWorkspaces = new CreateUserWorkspace(
    prismaUserWorkspacesRepository,
    createUserWorkspaceRoles,
  )
  const createWorkspace = new CreateWorkspace(
    prismaWorkspacesRepository,
    prismaUsersRepository,
    createUserWorkspaces,
  )

  return new CreateWorkspaceController(createWorkspace)
}
