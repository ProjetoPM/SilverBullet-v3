import { WeeklyEvaluation } from '../../domain/weekly-evaluation'
import { IWeeklyEvaluationsRepository } from '../../repositories/IWeeklyEvaluationsRepository'

type ListWeeklyEvaluationRequest = {
  workspaceId: string
}

type ListWeeklyEvaluationResponse = WeeklyEvaluation[]

export class ListWeeklyEvaluation {
  constructor(private weeklyEvaluationsRepository: IWeeklyEvaluationsRepository) {}

  async execute({workspaceId}: ListWeeklyEvaluationRequest): Promise<ListWeeklyEvaluationResponse> {
    return await this.weeklyEvaluationsRepository.listByWorkspace(workspaceId)
  }
}
