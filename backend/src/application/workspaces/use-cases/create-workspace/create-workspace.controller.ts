import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  created,
  notFound,
} from '@/core/infra/http-response'
import { t } from 'i18next'
import { CreateWorkspace } from './create-workspace'
import { UserDoesNotExistError } from '../errors/UserDoesNotExistError'

type CreateWorkspaceControllerRequest = {
  name: string
  description: string
  currentUserId: string
}

export class CreateWorkspaceController implements Controller {
  constructor(private createWorkspace: CreateWorkspace) {}

  async handle(
    request: CreateWorkspaceControllerRequest,
  ): Promise<HttpResponse> {
    const result = await this.createWorkspace.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserDoesNotExistError:
          return notFound(error)
        default:
          return clientError(error)
      }
    }
    return created({ message: t('workspace.created') })
  }
}
