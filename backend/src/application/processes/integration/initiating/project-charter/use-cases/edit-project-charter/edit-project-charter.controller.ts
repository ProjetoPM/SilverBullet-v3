import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  created,
  forbidden,
} from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditProjectCharter } from './edit-project-charter'
import { UserDoesNotBelongToProjectError } from './errors/UserDoesNotBelongToProjectError'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { ProjectCharterAlreadySignedError } from './errors/ProjectCharterAlreadySignedError'

type EditProjectCharterControllerRequest = {
  projectName: string
  highLevelProjectDescription: string
  startDate: Date
  endDate: Date
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
  projectExitCriteria: string
  currentUserId: string
  projectCharterId: string
}

export class EditProjectCharterController implements Controller {
  constructor(
    private readonly validator: Validator<EditProjectCharterControllerRequest>,
    private editProjectCharter: EditProjectCharter,
  ) {}

  async handle(
    request: EditProjectCharterControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editProjectCharter.execute({
      projectName: request.projectName,
      projectPurpose: request.projectPurpose,
      boundaries: request.boundaries,
      highLevelProjectDescription: request.highLevelProjectDescription,
      highLevelRequirements: request.highLevelRequirements,
      keyBenefits: request.keyBenefits,
      measurableProjectObjectives: request.measurableProjectObjectives,
      overallProjectRisk: request.overallProjectRisk,
      preApprovedFinancialResources: request.preApprovedFinancialResources,
      projectApprovalRequirements: request.projectApprovalRequirements,
      projectExitCriteria: request.projectExitCriteria,
      successCriteria: request.successCriteria,
      summaryMilestoneSchedule: request.summaryMilestoneSchedule,
      startDate: new Date(request.startDate),
      endDate: new Date(request.endDate),
      projectCharterId: request.projectCharterId,
      userId: request.currentUserId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserDoesNotBelongToProjectError:
          return clientError(error)
        case UserDoesNotExistError:
          return clientError(error)
        case ProjectCharterAlreadySignedError:
          return forbidden(error)
        default:
          return clientError(error)
      }
    }

    return created({ message: t('project_charter.updated') })
  }
}
