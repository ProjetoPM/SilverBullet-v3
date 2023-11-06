import { WeeklyEvaluation } from '../domain/weekly-evaluation'

export interface IWeeklyEvaluationsRepository {
  create(weeklyEvaluation: WeeklyEvaluation): Promise<void>
  listByWorkspace(workspaceId: string): Promise<WeeklyEvaluation[]>
}
