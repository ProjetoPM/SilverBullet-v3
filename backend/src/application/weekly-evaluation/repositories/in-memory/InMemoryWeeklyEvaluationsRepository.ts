import { EvaluationStatuses } from '../../domain/evaluation-statuses.enum'
import { WeeklyEvaluation } from '../../domain/weekly-evaluation'
import { IWeeklyEvaluationsRepository } from '../IWeeklyEvaluationsRepository'

export class InMemoryWeeklyEvaluationsRepository
  implements IWeeklyEvaluationsRepository
{
  constructor(public weeklyEvaluations: WeeklyEvaluation[] = []) {}
  async listAvailableEvaluations(
    workspaceId: string,
  ): Promise<WeeklyEvaluation[]> {
    const currentTime = new Date().getTime()

    return this.weeklyEvaluations.filter(
      (weeklyEvaluation) =>
        weeklyEvaluation.props.status === EvaluationStatuses.OPEN &&
        weeklyEvaluation.props.startDate.getTime() < currentTime &&
        weeklyEvaluation.props.endDate.getTime() > currentTime,
    )
  }
  async listByWorkspace(workspaceId: string): Promise<WeeklyEvaluation[]> {
    return this.weeklyEvaluations.filter(
      (weeklyEvaluation) => weeklyEvaluation.props.workspaceId === workspaceId,
    )
  }

  async create(weeklyEvaluation: WeeklyEvaluation): Promise<void> {
    this.weeklyEvaluations.push(weeklyEvaluation)
  }
}
