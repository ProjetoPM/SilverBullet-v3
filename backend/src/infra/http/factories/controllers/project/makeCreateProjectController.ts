import { PrismaProjectsRepository } from '@/application/projects/repositories/prisma/PrismaProjectsRepository'
import { CreateProject } from '@/application/projects/use-cases/create-project/create-project'
import { CreateProjectController } from '@/application/projects/use-cases/create-project/create-project.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateProjectController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaProjectsRepository = new PrismaProjectsRepository()
  const prismaWorkspacesRepository = new PrismaWorkspacesRepository()

  const createProject = new CreateProject(
    prismaProjectsRepository,
    prismaUsersRepository,
    prismaWorkspacesRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreateProjectController(validator, createProject)
}
