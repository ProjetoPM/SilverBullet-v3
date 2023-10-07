import { UserWorkspace } from '../domain/user-workspace'

export interface IUserWorkspacesRepository {
  create(workspace: UserWorkspace): Promise<void>
}
