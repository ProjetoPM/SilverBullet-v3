import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  created,
  forbidden,
  notFound,
} from '@/core/infra/http-response'
import { t } from 'i18next'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { CreateWeeklyEvaluation } from './create-weekly-evaluation'
import { Validator } from '../../../../core/infra/validator'
import { Types } from '../../domain/types.enum'
import { EvaluationStatuses } from '../../domain/status.enum'
import { UserDoesNotBelongToWorkspaceError } from './errors/UserDoesNotBelongToWorkspaceError'
import { WorkspaceDoesNotExistError } from './errors/WorkspaceDoesNotExistError'
import { StartDateGreaterThanEndDateError } from './errors/StartDateGreaterThanEndDateError'

type CreateWeeklyEvaluationControllerRequest = {
  name: string
  startDate: string
  endDate: string
  type: Types
  status: EvaluationStatuses
  currentWorkspaceId: string
  currentUserId: string
}

export class CreateWeeklyEvaluationController implements Controller {
  constructor(
    private readonly validator: Validator<CreateWeeklyEvaluationControllerRequest>,
    private createWeeklyEvaluation: CreateWeeklyEvaluation,
  ) {}

  async handle({
    currentWorkspaceId,
    currentUserId,
    startDate,
    endDate,
    ...request
  }: CreateWeeklyEvaluationControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate({
      currentUserId,
      currentWorkspaceId,
      startDate,
      endDate,
      ...request,
    })

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createWeeklyEvaluation.execute({
      userId: currentUserId,
      workspaceId: currentWorkspaceId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      ...request,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case StartDateGreaterThanEndDateError:
          return clientError(error)
        case UserDoesNotBelongToWorkspaceError:
          return forbidden(error)
        case UserDoesNotExistError:
        case WorkspaceDoesNotExistError:
          return notFound(error)
        default:
          return clientError(error)
      }
    }

    return created({ message: t('weekly_evaluation.created') })
  }
}
