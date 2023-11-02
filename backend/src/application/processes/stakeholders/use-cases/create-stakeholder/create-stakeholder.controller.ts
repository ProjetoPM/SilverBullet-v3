import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  conflict,
  created,
} from '@/core/infra/http-response'
import { t } from 'i18next'
import { CreateStakeholder } from './create-stakeholder'
import { StakeholderDoesNotExistError } from './errors/StakeholderDoesNotExistError'
import { Types } from '../../domain/types.enum'
import { Roles } from '../../domain/roles.enum'

type CreateStakeholderControllerRequest = {
  type: Types
  mainProjectRole: Roles
  email: string
  organization: string
  organizationPosition: string
  mainProjectResponsibility: string
  phone: string
  workplace: string
  essentialRequirements: string
  mainExpectations: string
  greaterInterestPhase: string
  observations: string
  projectId: string
  userId: string
}

// @TODO
// Error for invalid workspaceId
// Verify if user belongs to workspace

export class CreateStakeholderController implements Controller {
  constructor(private createStakeholder: CreateStakeholder) {}

  async handle(
    request: CreateStakeholderControllerRequest,
  ): Promise<HttpResponse> {
    const result = await this.createStakeholder.execute(request)

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
