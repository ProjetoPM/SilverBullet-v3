import { PrismaProjectsRepository } from '@/application/projects/repositories/prisma/PrismaProjectsRepository'
import { ListProject } from '@/application/projects/use-cases/list-project/list-project'
import { ListProjectController } from '@/application/projects/use-cases/list-project/list-project.controller'
import { Controller } from '@/core/infra/controller'

export function makeListProjectController(): Controller {
  const prismaProjectsRepository = new PrismaProjectsRepository()
  const listProject = new ListProject(prismaProjectsRepository)

  return new ListProjectController(listProject)
}
