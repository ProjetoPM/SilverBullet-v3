import { HttpResponse, fail, ok } from '@/core/infra/http-response'
import { Middleware } from '@/core/infra/middleware'

type GetCurrentWorkspaceAndProjectMiddlewareRequest = {
  workspaceId: string
  projectId: string
}

export class GetCurrentWorkspaceAndProjectMiddleware implements Middleware {
  constructor() {}

  async handle(
    request: GetCurrentWorkspaceAndProjectMiddlewareRequest,
  ): Promise<HttpResponse> {
    try {
      const { workspaceId, projectId } = request
      return ok({ workspaceId, projectId })
    } catch (error: any) {
      return fail(error)
    }
  }
}
