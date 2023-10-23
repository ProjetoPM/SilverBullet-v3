import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListWorkspace } from './list-workspace'

export class ListWorkspaceController implements Controller {
  constructor(private listWorkspace: ListWorkspace) {}

  async handle(): Promise<HttpResponse> {
    const workspaces = await this.listWorkspace.execute()
    return ok({
      dto: workspaces.map((workspace) => workspace.toResponseBody()),
    })
  }
}
