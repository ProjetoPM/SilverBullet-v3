import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListAvailableWeeklyEvaluation } from './list-available-evaluation'

type ListAvailableWeeklyEvaluationControllerRequest = {
  currentWorkspaceId: string
}


export class ListAvailableEvaluationController implements Controller {
  constructor(
    private listAvailableWeeklyEvaluation: ListAvailableWeeklyEvaluation,
  ) {}

  async handle({
    currentWorkspaceId,
  }: ListAvailableWeeklyEvaluationControllerRequest): Promise<HttpResponse> {
    const weeklyEvaluations = await this.listAvailableWeeklyEvaluation.execute({
      workspaceId: currentWorkspaceId,
    })

    return ok({
      dto: weeklyEvaluations.map((weeklyEvaluation) =>
        weeklyEvaluation.toResponseBody(),
      ),
    })
  }
}
