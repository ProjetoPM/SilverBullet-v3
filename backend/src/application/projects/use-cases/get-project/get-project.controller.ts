import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { GetProject } from './get-project'
import { ProjectNotFoundError } from './errors/ProjectNotFoundError'

type GetProjectControllerRequest = {
  projectId: string
}

export class GetProjectController implements Controller {
  constructor(
    private readonly validator: Validator<GetProjectControllerRequest>,
    private getProject: GetProject,
  ) {}

  async handle(request: GetProjectControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getProject.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ProjectNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
