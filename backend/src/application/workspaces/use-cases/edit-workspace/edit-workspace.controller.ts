import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  created,
  ok,
} from '@/core/infra/http-response'
import { t } from 'i18next'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { EditWorkspace } from './edit-workspace'
import { Validator } from '@/core/infra/validator'
import { WorkspaceDoesNotExistError } from './errors/WorkspaceDoesNotExistError'

type EditWorkspaceControllerRequest = {
  workspaceId: string
  name: string
  description: string
  currentUserId: string
}

export class EditWorkspaceController implements Controller {
  constructor(
    private readonly validator: Validator<EditWorkspaceControllerRequest>,
    private editWorkspace: EditWorkspace,
  ) {}

  async handle(request: EditWorkspaceControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editWorkspace.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WorkspaceDoesNotExistError:
        case UserDoesNotExistError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('workspace.edited') })
  }
}
