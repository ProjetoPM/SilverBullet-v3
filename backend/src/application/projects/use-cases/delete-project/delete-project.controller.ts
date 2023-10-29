import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  notFound,
  ok,
} from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteProject } from './delete-project'
import { OneOrMoreProjectNotFoundError } from './errors/OneOrMoreProjectNotFoundError'
import { ProjectNotFoundError } from './errors/ProjectNotFoundError'

type DeleteProjectControllerRequest = {
  ids: string[]
}

export class DeleteProjectController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteProjectControllerRequest>,
    private deleteProject: DeleteProject,
  ) {}

  async handle(request: DeleteProjectControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteProject.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ProjectNotFoundError:
          return notFound(error)
        case OneOrMoreProjectNotFoundError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    const message =
      request.ids?.length > 1 ? t('project.deleted_many') : t('project.deleted')

    return ok({ message })
  }
}
