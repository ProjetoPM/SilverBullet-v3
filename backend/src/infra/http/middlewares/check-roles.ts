import { ProjectRoles } from '@/application/projects/domain/project-roles.schema'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { HttpResponse, fail, ok } from '@/core/infra/http-response'
import { Middleware } from '@/core/infra/middleware'
import { IWorkspacesRepository } from '../../../application/workspaces/repositories/IWorkspacesRepository'
import { IProjectsRepository } from '@/application/projects/repositories/IProjectsRepository'
import { t } from 'i18next'

type CheckUserRoleMiddlewareRequest = {
  currentUserId: string
  currentWorkspaceId: string
  currentProjectId: string
}

export type RolesMiddleware = {
  workspace?: Array<keyof typeof WorkspaceRoles>
  project?: Array<keyof typeof ProjectRoles>
}

export class CheckUserRolesMiddleware implements Middleware {
  constructor(
    private workspaceRepository: IWorkspacesRepository,
    private projectsRepository: IProjectsRepository,
    private readonly roles?: RolesMiddleware,
  ) {}

  async handle(request: CheckUserRoleMiddlewareRequest): Promise<HttpResponse> {
    try {
      const { currentUserId } = request

      if (!currentUserId) {
        return fail({ message: t('middleware.no_user_detected') })
      }

      const { workspace, project } = this.roles ?? {}

      if (workspace) {
        const { currentWorkspaceId } = request

        if (!currentWorkspaceId) {
          return fail({ message: t('middleware.no_workspace_detected') })
        }

        const isWorkspacePermissionValid =
          await this.workspaceRepository.checkUserPermission(
            currentUserId,
            currentWorkspaceId,
            workspace as WorkspaceRoles[],
          )

        if (!isWorkspacePermissionValid) {
          return fail({ message: t('middleware.no_workspace_permission') })
        }
      }

      if (project) {
        const { currentProjectId } = request

        if (!currentProjectId) {
          return fail({ message: t('middleware.no_project_detected') })
        }

        const isProjectPermissionValid =
          await this.projectsRepository.checkUserPermission(
            currentUserId,
            currentProjectId,
            project as ProjectRoles[],
          )

        if (!isProjectPermissionValid) {
          return fail({ message: t('middleware.no_project_permission') })
        }
      }

      return ok()
    } catch (error: any) {
      return fail(error)
    }
  }
}
