import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { GetWorkspace } from './get-workspace'
import { WorkspaceNotFoundError } from './errors/WorkspaceNotFoundError'

type GetWorkspaceControllerRequest = {
  workspaceId: string
}

export class GetWorkspaceController implements Controller {
  constructor(
    private readonly validator: Validator<GetWorkspaceControllerRequest>,
    private getWorkspace: GetWorkspace,
  ) {}

  async handle(request: GetWorkspaceControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getWorkspace.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WorkspaceNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
