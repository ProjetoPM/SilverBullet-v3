import { PrismaProjectChartersRepository } from '@/application/processes/integration/initiating/project-charter/repositories/prisma/PrismaProjectChartersRepository'
import { GetProjectCharter } from '@/application/processes/integration/initiating/project-charter/use-cases/get-project-charter/get-project-charter'
import { GetProjectCharterController } from '@/application/processes/integration/initiating/project-charter/use-cases/get-project-charter/get-project-charter.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetProjectCharterController(): Controller {
  const prismaProjectChartersRepository = new PrismaProjectChartersRepository()

  const getProjectCharter = new GetProjectCharter(
    prismaProjectChartersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new GetProjectCharterController(validator, getProjectCharter)
}
