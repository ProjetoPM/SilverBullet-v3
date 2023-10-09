import { Workspace } from '../domain/workspace'
import { UserWorkspaceRole } from '../domain/user-workspace-role'
import { UserWorkspace } from '../domain/user-workspace'

export interface IWorkspacesRepository {
  create(
    workspace: Workspace,
    userWorkspace: UserWorkspace,
    userWorkspaceRole: UserWorkspaceRole,
  ): Promise<void>
}
