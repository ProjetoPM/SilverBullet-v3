import { PrismaProjectsRepository } from '@/application/projects/repositories/prisma/PrismaProjectsRepository'
import { EditProject } from '@/application/projects/use-cases/edit-project/edit-project'
import { EditProjectController } from '@/application/projects/use-cases/edit-project/edit-project.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditProjectController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaProjectsRepository = new PrismaProjectsRepository()

  const editProject = new EditProject(
    prismaProjectsRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new EditProjectController(validator, editProject)
}
