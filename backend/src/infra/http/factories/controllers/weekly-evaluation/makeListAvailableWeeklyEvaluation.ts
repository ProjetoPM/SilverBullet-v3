import { PrismaWeeklyEvaluationsRepository } from '@/application/weekly-evaluation/repositories/prisma/PrismaWeeklyEvaluationsRepository'
import { ListAvailableWeeklyEvaluation } from '@/application/weekly-evaluation/use-cases/list-available-evaluation/list-available-evaluation'
import { ListAvailableEvaluationController } from '@/application/weekly-evaluation/use-cases/list-available-evaluation/list-available-evaluation.controller'
import { Controller } from '@/core/infra/controller'

export function makeListAvailableWeeklyEvaluationController(): Controller {
  const prismaWeeklyEvaluationsRepository =
    new PrismaWeeklyEvaluationsRepository()

  const listAvailableWeeklyEvaluation = new ListAvailableWeeklyEvaluation(
    prismaWeeklyEvaluationsRepository,
  )


  return new ListAvailableEvaluationController(listAvailableWeeklyEvaluation)
}