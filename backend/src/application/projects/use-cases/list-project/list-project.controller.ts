import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListProject } from './list-project'
type ListProjectRequest = {
  currentUserId: string
  workspaceId: string
}

export class ListProjectController implements Controller {
  constructor(private listProject: ListProject) {}

  async handle(data: ListProjectRequest): Promise<HttpResponse> {
    const projects = await this.listProject.execute(data)
    return ok({
      dto: projects.map((project) => project.toResponseBody()),
    })
  }
}
