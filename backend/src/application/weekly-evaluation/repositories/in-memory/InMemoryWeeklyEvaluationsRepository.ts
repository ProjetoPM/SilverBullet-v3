import { WeeklyEvaluation } from '../../domain/weekly-evaluation'
import { IWeeklyEvaluationsRepository } from '../IWeeklyEvaluationsRepository'

export class InMemoryWeeklyEvaluationsRepository
  implements IWeeklyEvaluationsRepository
{
  constructor(public weeklyEvaluations: WeeklyEvaluation[] = []) {}

  async create(weeklyEvaluation: WeeklyEvaluation): Promise<void> {
    this.weeklyEvaluations.push(weeklyEvaluation)
  }
}
