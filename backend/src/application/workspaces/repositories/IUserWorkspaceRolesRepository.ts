import { UserWorkspaceRole } from '../domain/user-workspace-role'

export interface IUserWorkspaceRolesRepository {
  create(workspace: UserWorkspaceRole): Promise<void>
}
