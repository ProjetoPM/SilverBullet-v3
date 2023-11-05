import { prismaClient } from '@/infra/prisma/client'
import { WeeklyEvaluationMapper } from '../../mappers/weekly-evaluation-mapper'
import { IWeeklyEvaluationsRepository } from '../IWeeklyEvaluationsRepository'
import { WeeklyEvaluation } from '../../domain/weekly-evaluation'

export class PrismaWeeklyEvaluationsRepository
  implements IWeeklyEvaluationsRepository
{
  async create(weeklyEvaluation: WeeklyEvaluation): Promise<void> {
    const data = await WeeklyEvaluationMapper.toPersistence(weeklyEvaluation)

    await prismaClient.weeklyEvaluation.create({
      data,
    })
  }
}
