import { Workspace } from '../../domain/workspace'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'

type ListWorkspaceResponse = Workspace[]

export class ListWorkspace {
  constructor(private workspacesRepository: IWorkspacesRepository) {}

  async execute(): Promise<ListWorkspaceResponse> {
    const workspaces = await this.workspacesRepository.list()
    return workspaces
  }
}
