import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  conflict,
  created,
} from '@/core/infra/http-response'
import { t } from 'i18next'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { CreateProjectCharter } from './create-project-charter'
import { Validator } from '@/core/infra/validator'
import { DuplicatedProjectCharterError } from './errors/DuplicatedProjectCharterError'
import { ProjectDoesNotExistError } from './errors/ProjectDoesNotExistError'
import { UserDoesNotBelongToProjectError } from './errors/UserDoesNotBelongToProjectError'

type CreateProjectCharterControllerRequest = {
  projectName: string
  highLevelProjectDescription: string
  startDate: string
  endDate: string
  projectPurpose: string
  measurableProjectObjectives: string
  keyBenefits: string
  highLevelRequirements: string
  boundaries: string
  overallProjectRisk: string
  summaryMilestoneSchedule: string
  preApprovedFinancialResources: string
  projectApprovalRequirements: string
  successCriteria: string
  signed: boolean
  projectExitCriteria: string
  currentProjectId: string
  currentUserId: string
}

export class CreateProjectCharterController implements Controller {
  constructor(
    private readonly validator: Validator<CreateProjectCharterControllerRequest>,
    private createProjectCharter: CreateProjectCharter,
  ) {}

  async handle({
    startDate,
    endDate,
    ...request
  }: CreateProjectCharterControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate({
      ...request,
      startDate,
      endDate,
    })

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createProjectCharter.execute({
      ...request,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      projectId: request.currentProjectId,
      userId: request.currentUserId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserDoesNotBelongToProjectError:
        case ProjectDoesNotExistError:
        case UserDoesNotExistError:
          return clientError(error)
        case DuplicatedProjectCharterError:
          return conflict(error)
        default:
          return clientError(error)
      }
    }

    return created({ message: t('project_charter.created') })
  }
}
