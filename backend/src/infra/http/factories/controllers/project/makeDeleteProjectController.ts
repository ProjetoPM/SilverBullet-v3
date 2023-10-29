import { PrismaProjectsRepository } from '@/application/projects/repositories/prisma/PrismaProjectsRepository'
import { DeleteProject } from '@/application/projects/use-cases/delete-project/delete-project'
import { DeleteProjectController } from '@/application/projects/use-cases/delete-project/delete-project.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteProjectController(): Controller {
  const prismaProjectsRepository = new PrismaProjectsRepository()

  const deleteProject = new DeleteProject(prismaProjectsRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteProjectController(validator, deleteProject)
}
