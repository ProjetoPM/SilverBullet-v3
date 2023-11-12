import { WeeklyEvaluation } from '../../domain/weekly-evaluation'
import { IWeeklyEvaluationsRepository } from '../../repositories/IWeeklyEvaluationsRepository'

type ListAvailableWeeklyEvaluationRequest = {
  workspaceId: string
}

export type ListAvailableWeeklyEvaluationResponse = WeeklyEvaluation[]

export class ListAvailableWeeklyEvaluation {
  constructor(private weeklyEvaluationsRepository: IWeeklyEvaluationsRepository) {}

  async execute({workspaceId}: ListAvailableWeeklyEvaluationRequest): Promise<ListAvailableWeeklyEvaluationResponse> {
    return await this.weeklyEvaluationsRepository.listAvailableEvaluations(workspaceId)
  }
}
