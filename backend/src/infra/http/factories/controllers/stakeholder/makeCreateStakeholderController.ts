import { PrismaStakeholdersRepository } from '@/application/stakeholder/initiating/stakeholders/repositories/prisma/PrismaStakeholdersRepository'
import { CreateStakeholder } from '@/application/stakeholder/initiating/stakeholders/use-cases/create-stakeholder/create-stakeholder'
import { CreateStakeholderController } from '@/application/stakeholder/initiating/stakeholders/use-cases/create-stakeholder/create-stakeholder.controller'
import { Controller } from '@/core/infra/controller'

export function makeCreateStakeholderController(): Controller {
  const prismaStakeholdersRepository = new PrismaStakeholdersRepository()

  const createStakeholder = new CreateStakeholder(prismaStakeholdersRepository)

  return new CreateStakeholderController(createStakeholder)
}
