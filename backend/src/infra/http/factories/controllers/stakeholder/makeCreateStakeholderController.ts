import { PrismaStakeholdersRepository } from '@/application/processes/stakeholders/repositories/prisma/PrismaStakeholdersRepository'
import { CreateStakeholder } from '@/application/processes/stakeholders/use-cases/create-stakeholder/create-stakeholder'
import { CreateStakeholderController } from '@/application/processes/stakeholders/use-cases/create-stakeholder/create-stakeholder.controller'
import { Controller } from '@/core/infra/controller'

export function makeCreateStakeholderController(): Controller {
  const prismaStakeholdersRepository = new PrismaStakeholdersRepository()

  const createStakeholder = new CreateStakeholder(prismaStakeholdersRepository)

  return new CreateStakeholderController(createStakeholder)
}
