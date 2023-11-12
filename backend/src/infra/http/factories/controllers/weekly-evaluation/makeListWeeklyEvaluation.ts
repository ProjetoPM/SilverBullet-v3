import { PrismaWeeklyEvaluationsRepository } from '@/application/weekly-evaluation/repositories/prisma/PrismaWeeklyEvaluationsRepository'
import { ListWeeklyEvaluation } from '@/application/weekly-evaluation/use-cases/list-weekly-evaluation/list-weekly-evaluation'
import { ListWeeklyEvaluationController } from '@/application/weekly-evaluation/use-cases/list-weekly-evaluation/list-weekly-evaluation.controller'
import { Controller } from '@/core/infra/controller'

export function makeListWeeklyEvaluationController(): Controller {
  const prismaWeeklyEvaluationsRepository =
    new PrismaWeeklyEvaluationsRepository()

  const listWeeklyEvaluation = new ListWeeklyEvaluation(
    prismaWeeklyEvaluationsRepository,
  )


  return new ListWeeklyEvaluationController(listWeeklyEvaluation)
}
