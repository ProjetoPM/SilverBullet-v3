import { Workspace } from '../../domain/workspace'
import { IWorkspacesRepository } from '../IWorkspacesRepository'

export class InMemoryWorkspacesRepository implements IWorkspacesRepository {
  constructor(public workspaces: Workspace[] = []) {}

  async create(workspace: Workspace): Promise<void> {
    this.workspaces.push(workspace)
  }
}
