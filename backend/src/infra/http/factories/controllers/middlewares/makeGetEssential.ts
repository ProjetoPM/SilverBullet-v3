import { Middleware } from '@/core/infra/middleware'
import { GetCurrentWorkspaceAndProjectMiddleware } from '@/infra/http/middlewares/get-current-workspace-and-project'

export function makeGetCurrentWorkspaceAndProject(): Middleware {
  const getEssential = new GetCurrentWorkspaceAndProjectMiddleware()
  return getEssential
}
