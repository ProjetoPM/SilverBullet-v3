import { Workspace } from '../domain/workspace'
import { User } from '@/application/users/domain/user'
import { Roles } from '../domain/roles.schema'

export interface IWorkspacesRepository {
  create(workspace: Workspace, user: User, role: Roles): Promise<void>

  findById(id: string): Promise<Workspace | null>
}
