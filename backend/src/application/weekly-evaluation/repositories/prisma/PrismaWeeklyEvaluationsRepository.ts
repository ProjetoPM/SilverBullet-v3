import { prismaClient } from '@/infra/prisma/client'
import { WeeklyEvaluationMapper } from '../../mappers/weekly-evaluation-mapper'
import { IWeeklyEvaluationsRepository } from '../IWeeklyEvaluationsRepository'
import { WeeklyEvaluation } from '../../domain/weekly-evaluation'
import { EvaluationStatuses } from '../../domain/evaluation-statuses.enum'

export class PrismaWeeklyEvaluationsRepository
  implements IWeeklyEvaluationsRepository
{
  async listAvailableEvaluations(workspaceId: string): Promise<WeeklyEvaluation[]> {
    const currentDate = new Date()

    const data = await prismaClient.weeklyEvaluation.findMany({
      where: {
        workspace_id: workspaceId,
        status: EvaluationStatuses.OPEN,
        start_date: {
          lt: currentDate,
        },
        end_date: {
          gt: currentDate,
        },
      }
    })

    const weeklyEvaluations = data.map(dbWeeklyEvaluations => WeeklyEvaluationMapper.toDomain(dbWeeklyEvaluations))

    return weeklyEvaluations
  }
  async create(weeklyEvaluation: WeeklyEvaluation): Promise<void> {
    const data = await WeeklyEvaluationMapper.toPersistence(weeklyEvaluation)
    
    await prismaClient.weeklyEvaluation.create({
      data,
    })
  }
  async listByWorkspace(workspaceId: string): Promise<WeeklyEvaluation[]> {
    const data = await prismaClient.weeklyEvaluation.findMany({
      where: {
        workspace_id: workspaceId
      }
    })

    const weeklyEvaluations = data.map(dbWeeklyEvaluations => WeeklyEvaluationMapper.toDomain(dbWeeklyEvaluations))

    return weeklyEvaluations
  }
}
