import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, fail, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteWorkspace } from './delete-workspace'
import { WorkspaceNotFoundError } from './errors/WorkspaceNotFoundError'
import { OneOrMoreWorkspaceNotFoundError } from './errors/OneOrMoreWorkspaceNotFoundError'

type DeleteWorkspaceControllerRequest = {
  ids: string[]
}

export class DeleteWorkspaceController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteWorkspaceControllerRequest>,
    private deleteWorkspace: DeleteWorkspace,
  ) {}

  async handle(
    request: DeleteWorkspaceControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteWorkspace.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WorkspaceNotFoundError:
        case OneOrMoreWorkspaceNotFoundError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    const message =
      request.ids?.length > 1
        ? t('workspace.deleted_many')
        : t('workspace.deleted')

    return ok({ message })
  }
}
