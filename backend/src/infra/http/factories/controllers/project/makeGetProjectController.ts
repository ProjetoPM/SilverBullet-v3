import { PrismaProjectsRepository } from '@/application/projects/repositories/prisma/PrismaProjectsRepository'
import { GetProject } from '@/application/projects/use-cases/get-project/get-project'
import { GetProjectController } from '@/application/projects/use-cases/get-project/get-project.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetProjectController(): Controller {
  const prismaProjectsRepository = new PrismaProjectsRepository()

  const getProject = new GetProject(prismaProjectsRepository)

  const validator = new ValidatorCompositor([])

  return new GetProjectController(validator, getProject)
}
