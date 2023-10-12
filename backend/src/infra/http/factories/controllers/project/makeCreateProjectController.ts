import { Controller } from '@/core/infra/controller'
import { CreateProjectController } from '@/application/projects/use-cases/create-project/create-project.controller'
import { CreateProject } from '@/application/projects/use-cases/create-project/create-project'
import { PrismaProjectsRepository } from '@/application/projects/repositories/prisma/PrismaProjectsRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { PrismaWorkspacesRepository } from '@/application/projects/repositories/prisma/PrismaWorkspacesRepository'

export function makeCreateProjectController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaProjectsRepository = new PrismaProjectsRepository()
  const prismaWorkspacesRepository = new PrismaWorkspacesRepository()

  const createProject = new CreateProject(
    prismaProjectsRepository,
    prismaUsersRepository,
    prismaWorkspacesRepository,
  )

  return new CreateProjectController(createProject)
}
