import { Workspace } from '../domain/workspace'

export interface IWorkspacesRepository {
  create(workspace: Workspace): Promise<void>
}
