import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { GetWorkspace } from '@/application/workspaces/use-cases/get-workspace/get-workspace'
import { GetWorkspaceController } from '@/application/workspaces/use-cases/get-workspace/get-workspace.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetWorkspaceController(): Controller {
  const prismaWorkspacesRepository = new PrismaWorkspacesRepository()
  const getWorkspace = new GetWorkspace(prismaWorkspacesRepository)

  const validator = new ValidatorCompositor([])

  return new GetWorkspaceController(validator, getWorkspace)
}
