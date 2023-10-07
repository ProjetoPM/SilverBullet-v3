import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  conflict,
  created,
} from '@/core/infra/http-response'
import { t } from 'i18next'
import { CreateProject } from './create-project'

type CreateProjectControllerRequest = {
  name: string
  description?: string
  workspaceId: string
  currentUserId: string
}

// @TODO
// Error for invalid workspaceId
// Verify if user belongs to workspace

export class CreateProjectController implements Controller {
  constructor(private createProject: CreateProject) {}

  async handle(request: CreateProjectControllerRequest): Promise<HttpResponse> {
    const result = await this.createProject.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }
    return created({ message: t('project.created') })
  }
}
