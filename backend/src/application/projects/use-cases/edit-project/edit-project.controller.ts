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
import { UserDoesNotExistError } from '../errors/UserDoesNotExistError'
import { Validator } from '@/core/infra/validator'
import { UserDoesNotBelongToProjectError } from '../errors/UserDoesNotBelongToProjectError'
import { ProjectDoesNotExistError } from '../errors/ProjectDoesNotExistError'
import { ProjectWithSameNameExistsError } from '../errors/ProjectWithSameNameExistsError'

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
        case UserDoesNotBelongToProjectError:
          return forbidden(error)
        case ProjectWithSameNameExistsError:
          return conflict(error)
        case ProjectDoesNotExistError:
          return notFound(error)
        case UserDoesNotExistError:
          return notFound(error)
        default:
          return clientError(error)
      }
    }
    return ok({ message: t('project.created') })
  }
}
