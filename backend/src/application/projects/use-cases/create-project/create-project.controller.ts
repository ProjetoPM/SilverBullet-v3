import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  created,
  forbidden,
  notFound,
} from '@/core/infra/http-response'
import { t } from 'i18next'
import { CreateProject } from './create-project'
import { UserDoesNotExistError } from '../errors/UserDoesNotExistError'
import { UserDoesNotBelongToWorkspaceError } from '../errors/UserDoesNotBelongToWorkspaceError'

type CreateProjectControllerRequest = {
  name: string
  description?: string
  workspaceId: string
  currentUserId: string
}

export class CreateProjectController implements Controller {
  constructor(private createProject: CreateProject) {}

  async handle(request: CreateProjectControllerRequest): Promise<HttpResponse> {
    const result = await this.createProject.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserDoesNotBelongToWorkspaceError:
          return forbidden(error)
        case UserDoesNotExistError:
          return notFound(error)
        default:
          return clientError(error)
      }
    }
    return created({ message: t('project.created') })
  }
}
