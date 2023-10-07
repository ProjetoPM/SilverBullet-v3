import { Controller } from '@/core/infra/controller'
import { CreateProjectController } from '@/application/projects/use-cases/create-user-project/create-project.controller'
import { CreateProject } from '@/application/projects/use-cases/create-user-project/create-project'
import { PrismaProjectsRepository } from '@/application/projects/repositories/prisma/PrismaProjectsRepository'
import { PrismaUserProjectsRepository } from '@/application/user-projects/repositories/prisma/PrismaUserProjectsRepository'
import { CreateUserProject } from '@/application/user-projects/use-cases/create-user-project/create-user-project'
import { CreateUserProjectRoles } from '@/application/user-project-roles/use-cases/create-user-project-roles/create-user-project-roles'
import { PrismaUserProjectRolesRepository } from '@/application/user-project-roles/repositories/prisma/PrismaUserProjectRolesRepository'

export function makeCreateProjectController(): Controller {
  const prismaProjectsRepository = new PrismaProjectsRepository()
  const prismaUserProjectsRepository = new PrismaUserProjectsRepository()
  const prismaUserProjectRolesRepository =
    new PrismaUserProjectRolesRepository()

  const createUserProjectRoles = new CreateUserProjectRoles(
    prismaUserProjectRolesRepository,
  )
  const createUserProjects = new CreateUserProject(
    prismaUserProjectsRepository,
    createUserProjectRoles,
  )
  const createProject = new CreateProject(
    prismaProjectsRepository,
    createUserProjects,
  )

  return new CreateProjectController(createProject)
}
