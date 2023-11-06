import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListWeeklyEvaluation } from './list-weekly-evaluation'

type ListWeeklyEvaluationControllerRequest = {
  currentWorkspaceId: string
}

export class ListWeeklyEvaluationController implements Controller {
  constructor(private listWeeklyEvaluation: ListWeeklyEvaluation) {}

  async handle({currentWorkspaceId: workspaceId}: ListWeeklyEvaluationControllerRequest): Promise<HttpResponse> {
    const weeklyEvaluations = await this.listWeeklyEvaluation.execute({workspaceId })
    return ok({
      dto: weeklyEvaluations.map((weeklyEvaluation) => weeklyEvaluation.toResponseBody()),
    })
  }
}
