import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { t } from 'i18next'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { CreateWorkspace } from './create-metrics'
import { Validator } from '../../../../core/infra/validator'

type CreateWorkspaceControllerRequest = {
  name: string
  description: string
  currentUserId: string
}

export class CreateWorkspaceController implements Controller {
  constructor(
    private readonly validator: Validator<CreateWorkspaceControllerRequest>,
    private createWorkspace: CreateWorkspace,
  ) {}

  async handle(
    request: CreateWorkspaceControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createWorkspace.execute(request)

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
