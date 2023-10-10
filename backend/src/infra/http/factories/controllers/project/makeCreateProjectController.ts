import { Controller } from '@/core/infra/controller'
import { CreateProjectController } from '@/application/projects/use-cases/create-project/create-project.controller'
import { CreateProject } from '@/application/projects/use-cases/create-project/create-project'
import { PrismaProjectsRepository } from '@/application/projects/repositories/prisma/PrismaProjectsRepository'
import { PrismaUserProjectsRepository } from '@/application/projects/repositories/prisma/PrismaUserProjectsRepository'
import { PrismaUserProjectRolesRepository } from '@/application/projects/repositories/prisma/PrismaUserProjectRolesRepository'
import { PrismaUserWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaUserWorkspacesRepository'
import { PrismaUserWorkspaceRolesRepository } from '@/application/workspaces/repositories/prisma/PrismaUserWorkspaceRolesRepository'
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

  const prismaUserWorkspacesRepository = new PrismaUserWorkspacesRepository()
  const prismaUserWorkspaceRolesRepository =
    new PrismaUserWorkspaceRolesRepository()
  const workspacesRepository = new PrismaWorkspacesRepository(
    prismaUserWorkspacesRepository,
    prismaUserWorkspaceRolesRepository,
  )

  const usersRepository = new PrismaUsersRepository()

  const createProject = new CreateProject(
    prismaProjectsRepository,
    usersRepository,
    workspacesRepository,
  )

  return new CreateProjectController(createProject)
}
