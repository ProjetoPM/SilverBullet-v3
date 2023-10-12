import { Workspace } from '@/application/workspaces/domain/workspace'

export interface IWorkspacesRepository {
  verifyActiveWorkspace(userId: string, workspaceId: string): Promise<boolean>
  findById(id: string): Promise<Workspace | null>
}
