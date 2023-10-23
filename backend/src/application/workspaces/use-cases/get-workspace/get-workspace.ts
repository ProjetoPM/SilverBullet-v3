import { Either, left, right } from '@/core/logic/either'
import { WorkspaceNotFoundError } from './errors/WorkspaceNotFoundError'
import { Workspace } from '../../domain/workspace'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'

type GetWorkspaceRequest = {
  workspaceId: string
}

type GetWorkspaceResponse = Either<WorkspaceNotFoundError, Workspace>

export class GetWorkspace {
  constructor(private workspaceRepository: IWorkspacesRepository) {}

  async execute({
    workspaceId,
  }: GetWorkspaceRequest): Promise<GetWorkspaceResponse> {
    const workspace = await this.workspaceRepository.findById(workspaceId)

    if (!workspace) {
      return left(new WorkspaceNotFoundError())
    }

    return right(workspace)
  }
}
