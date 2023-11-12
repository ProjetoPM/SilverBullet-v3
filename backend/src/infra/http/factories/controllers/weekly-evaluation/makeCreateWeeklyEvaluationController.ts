import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { PrismaWeeklyEvaluationsRepository } from '@/application/weekly-evaluation/repositories/prisma/PrismaWeeklyEvaluationsRepository'
import { CreateWeeklyEvaluation } from '@/application/weekly-evaluation/use-cases/create-weekly-evaluation/create-weekly-evaluation'
import { CreateWeeklyEvaluationController } from '@/application/weekly-evaluation/use-cases/create-weekly-evaluation/create-weekly-evaluation.controller'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { Controller } from '@/core/infra/controller'
import { CheckDateFieldsValidator } from '@/infra/validation/CheckDateFieldsValidator'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

type CheckDate = {
  startDate: string
  endDate: string
}
export function makeCreateWeeklyEvaluationController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaWeeklyEvaluationsRepository =
    new PrismaWeeklyEvaluationsRepository()
  const prismaWorkspacesRepository = new PrismaWorkspacesRepository()

  const createWeeklyEvaluation = new CreateWeeklyEvaluation(
    prismaWorkspacesRepository,
    prismaWeeklyEvaluationsRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor<CheckDate>([
    new CheckDateFieldsValidator(['startDate', 'endDate']),
  ])

  return new CreateWeeklyEvaluationController(validator, createWeeklyEvaluation)
}
