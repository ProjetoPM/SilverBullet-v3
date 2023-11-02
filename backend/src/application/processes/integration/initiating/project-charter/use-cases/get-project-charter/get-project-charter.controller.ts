import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { GetProjectCharter } from './get-project-charter'
import { ProjectCharterNotFoundError } from './errors/ProjectCharterNotFoundError'

type GetProjectCharterControllerRequest = {
  projectCharterId: string
}

export class GetProjectController implements Controller {
  constructor(
    private readonly validator: Validator<GetProjectCharterControllerRequest>,
    private getProjectCharter: GetProjectCharter,
  ) {}

  async handle(
    request: GetProjectCharterControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getProjectCharter.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ProjectCharterNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
