import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  conflict,
  created,
} from '@/core/infra/http-response'
import { t } from 'i18next'
import { CreateStakeholderEngagementPlan } from './create-stakeholder-engagement-plan'
import { StakeholderDoesNotExistError } from '../get-last-stakeholder-engagement-plan/errors/StakeholderDoesNotExistError'
import { Engagements } from '../../domain/engagements.enum'

type CreateStakeholderEngagementControllerRequest = {
  stakeholderId: string
  currentEngagement: Engagements
  desiredEngagement: Engagements
  interestLevel: number
  powerLevel: number
  influenceLevel: number
  engagementManagementStrategy: string
  scopeImpactChangesToStakeholder: string
  observations: string
}

// @TODO
// Error for invalid workspaceId
// Verify if user belongs to workspace

export class CreateStakeholderEngagementPlanController implements Controller {
  constructor(
    private createStakeholderEngagementPlan: CreateStakeholderEngagementPlan,
  ) {}

  async handle(
    request: CreateStakeholderEngagementControllerRequest,
  ): Promise<HttpResponse> {
    const result = await this.createStakeholderEngagementPlan.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case StakeholderDoesNotExistError:
          return conflict(error)
        default:
          return clientError(error)
      }
    }
    return created({ message: t('stakeholder.created') })
  }
}
