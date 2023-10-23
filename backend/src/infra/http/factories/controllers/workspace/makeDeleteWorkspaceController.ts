import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { DeleteWorkspace } from '@/application/workspaces/use-cases/delete-workspace/delete-workspace'
import { DeleteWorkspaceController } from '@/application/workspaces/use-cases/delete-workspace/delete-workspace.controller'
import { EditWorkspace } from '@/application/workspaces/use-cases/edit-workspace/edit-workspace'
import { EditWorkspaceController } from '@/application/workspaces/use-cases/edit-workspace/edit-workspace.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteWorkspaceController(): Controller {
  const prismaWorkspacesRepository = new PrismaWorkspacesRepository()
  const deleteWorkspace = new DeleteWorkspace(prismaWorkspacesRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteWorkspaceController(validator, deleteWorkspace)
}
