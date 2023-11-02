import { PrismaProjectChartersRepository } from '@/application/processes/integration/initiating/project-charter/repositories/prisma/PrismaProjectChartersRepository'
import { CreateProjectCharter } from '@/application/processes/integration/initiating/project-charter/use-cases/create-project-charter/create-project-charter'
import { CreateProjectCharterController } from '@/application/processes/integration/initiating/project-charter/use-cases/create-project-charter/create-project-charter.controller'
import { PrismaProjectsRepository } from '@/application/projects/repositories/prisma/PrismaProjectsRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { CheckDateFieldsValidator } from '@/infra/validation/CheckDateFieldsValidator'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateProjectCharterController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaProjectsRepository = new PrismaProjectsRepository()
  const prismaProjectChartersRepository = new PrismaProjectChartersRepository()

  const createProjectCharter = new CreateProjectCharter(
    prismaProjectsRepository,
    prismaProjectChartersRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([
    new CheckDateFieldsValidator(['startDate', 'endDate']),
  ])

  return new CreateProjectCharterController(validator, createProjectCharter)
}
