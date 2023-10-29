import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { t } from 'i18next'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { CreateProjectCharter } from './create-project-charter'
import { Validator } from '@/core/infra/validator'

type CreateProjectCharterControllerRequest = {
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
  signed: boolean
  currentProjectId: string
  currentUserId: string
}

export class CreateProjectCharterController implements Controller {
  constructor(
    private readonly validator: Validator<CreateProjectCharterControllerRequest>,
    private createProjectCharter: CreateProjectCharter,
  ) {}

  async handle(
    request: CreateProjectCharterControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createProjectCharter.execute({
      ...request,
      projectId: request.currentProjectId,
      userId: request.currentUserId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserDoesNotExistError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    return created({ message: t('workspace.created') })
  }
}
