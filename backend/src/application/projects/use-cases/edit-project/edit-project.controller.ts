import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  conflict,
  forbidden,
  notFound,
  ok,
} from '@/core/infra/http-response'
import { t } from 'i18next'
import { EditProject } from './edit-project'
import { Validator } from '@/core/infra/validator'
import { ProjectWithSameNameExistsError } from './errors/ProjectWithSameNameExistsError'
import { ProjectDoesNotExistError } from './errors/ProjectDoesNotExistError'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { UserDoesNotBelongToProjectError } from './errors/UserDoesNotBelongToProjectError'

type EditProjectControllerRequest = {
  name: string
  description?: string
  projectId: string
  currentUserId: string
}

export class EditProjectController implements Controller {
  constructor(
    private readonly validator: Validator<EditProjectControllerRequest>,
    private editProject: EditProject,
  ) {}

  async handle(request: EditProjectControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editProject.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ProjectWithSameNameExistsError:
          return conflict(error)
        case UserDoesNotExistError:
        case ProjectDoesNotExistError:
          return notFound(error)
        case UserDoesNotBelongToProjectError:
          return forbidden(error)
        default:
          return clientError(error)
      }
    }
    return ok({ message: t('project.created') })
  }
}
