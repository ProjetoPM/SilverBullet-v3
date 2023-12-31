import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  conflict,
  created,
  forbidden,
  notFound,
} from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateProject } from './create-project'
import { UserDoesNotBelongToWorkspaceError } from './errors/UserDoesNotBelongToWorkspaceError'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { WorkspaceDoesNotExistError } from './errors/WorkspaceDoesNotExistError'
import { ProjectWithSameNameExistsError } from './errors/ProjectWithSameNameExistsError'

type CreateProjectControllerRequest = {
  name: string
  description?: string
  currentWorkspaceId: string
  currentUserId: string
}

export class CreateProjectController implements Controller {
  constructor(
    private readonly validator: Validator<CreateProjectControllerRequest>,
    private createProject: CreateProject,
  ) {}

  async handle(request: CreateProjectControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createProject.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserDoesNotBelongToWorkspaceError:
          return forbidden(error)
        case UserDoesNotExistError:
          return notFound(error)
        case WorkspaceDoesNotExistError:
          return notFound(error)
        case ProjectWithSameNameExistsError:
          return conflict(error)
        default:
          return clientError(error)
      }
    }
    return created({ message: t('project.created') })
  }
}
