import { WeeklyEvaluation } from '../../domain/weekly-evaluation'
import { IWeeklyEvaluationsRepository } from '../IWeeklyEvaluationsRepository'

export class InMemoryWeeklyEvaluationsRepository
  implements IWeeklyEvaluationsRepository
{
  constructor(public weeklyEvaluations: WeeklyEvaluation[] = []) {}
  async listByWorkspace(workspaceId: string): Promise<WeeklyEvaluation[]> {
    return this.weeklyEvaluations.filter(weeklyEvaluation => weeklyEvaluation.props.workspaceId === workspaceId)
  }

  async create(weeklyEvaluation: WeeklyEvaluation): Promise<void> {
    this.weeklyEvaluations.push(weeklyEvaluation)
  }
}
