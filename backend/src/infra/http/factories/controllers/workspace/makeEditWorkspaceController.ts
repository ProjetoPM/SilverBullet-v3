import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { EditWorkspace } from '@/application/workspaces/use-cases/edit-workspace/edit-workspace'
import { EditWorkspaceController } from '@/application/workspaces/use-cases/edit-workspace/edit-workspace.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditWorkspaceController(): Controller {
  const prismaWorkspacesRepository = new PrismaWorkspacesRepository()
  const prismaUsersRepository = new PrismaUsersRepository()

  const editWorkspace = new EditWorkspace(
    prismaWorkspacesRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new EditWorkspaceController(validator, editWorkspace)
}
