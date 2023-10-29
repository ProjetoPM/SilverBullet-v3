import { HttpResponse, fail, ok } from '@/core/infra/http-response'
import { Middleware } from '@/core/infra/middleware'

type GetCurrentWorkspaceAndProjectMiddlewareRequest = {
  currentWorkspaceId: string
  currentProjectId: string
}

export class GetCurrentWorkspaceAndProjectMiddleware implements Middleware {
  constructor() {}

  async handle(
    request: GetCurrentWorkspaceAndProjectMiddlewareRequest,
  ): Promise<HttpResponse> {
    try {
      const { currentWorkspaceId, currentProjectId } = request
      return ok({
        workspaceId: currentWorkspaceId,
        projectId: currentProjectId,
      })
    } catch (error: any) {
      return fail(error)
    }
  }
}
