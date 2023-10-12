import { User } from '@/application/users/domain/user'
import { Workspace } from '../../domain/workspace'
import { IWorkspacesRepository } from '../IWorkspacesRepository'
import { Roles } from '../../domain/roles.schema'

export class InMemoryWorkspacesRepository implements IWorkspacesRepository {
  constructor(public workspaces: Workspace[] = []) {}

  async findById(id: string): Promise<Workspace | null> {
    const workspace = this.workspaces.find((workspace) => workspace.id === id)

    if (!workspace) return null

    return workspace
  }

  async create(workspace: Workspace, user: User, role: Roles): Promise<void> {
    this.workspaces.push(workspace)
  }
}
