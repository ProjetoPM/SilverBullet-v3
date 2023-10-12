import { Controller } from '@/core/infra/controller'
import { CreateProjectController } from '@/application/projects/use-cases/create-project/create-project.controller'
import { CreateProject } from '@/application/projects/use-cases/create-project/create-project'
import { PrismaProjectsRepository } from '@/application/projects/repositories/prisma/PrismaProjectsRepository'
import { PrismaUserProjectsRepository } from '@/application/projects/repositories/prisma/PrismaUserProjectsRepository'
import { PrismaUserProjectRolesRepository } from '@/application/projects/repositories/prisma/PrismaUserProjectRolesRepository'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'

export function makeCreateProjectController(): Controller {
  const prismaUserProjectsRepository = new PrismaUserProjectsRepository()
  const prismaUserProjectRolesRepository =
    new PrismaUserProjectRolesRepository()
  const prismaProjectsRepository = new PrismaProjectsRepository(
    prismaUserProjectsRepository,
    prismaUserProjectRolesRepository,
  )

  const usersRepository = new PrismaUsersRepository()

  const createProject = new CreateProject(
    prismaProjectsRepository,
    usersRepository,
  )

  return new CreateProjectController(createProject)
}
