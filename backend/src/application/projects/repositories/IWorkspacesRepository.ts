import { Workspace } from '@/application/workspaces/domain/workspace'

export interface IWorkspacesRepository {
  verifyUserBelongsToWorkspace(
    userId: string,
    workspaceId: string,
  ): Promise<boolean>
  exists(id: string): Promise<boolean>
}
