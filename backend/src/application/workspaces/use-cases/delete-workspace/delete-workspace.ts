import { Either, left, right } from '@/core/logic/either'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { WorkspaceNotFoundError } from './errors/WorkspaceNotFoundError'
import { OneOrMoreWorkspaceNotFoundError } from './errors/OneOrMoreWorkspaceNotFoundError'

type DeleteWorkspaceRequest = {
  ids: string[]
}

type DeleteWorkspaceResponse = Either<
  OneOrMoreWorkspaceNotFoundError | WorkspaceNotFoundError,
  null
>

export class DeleteWorkspace {
  constructor(private workspaceRepository: IWorkspacesRepository) {}

  async execute({
    ids: workspaceId,
  }: DeleteWorkspaceRequest): Promise<DeleteWorkspaceResponse> {
    const categoryOrCategories = Array.isArray(workspaceId)
      ? workspaceId
      : [workspaceId]

    if (categoryOrCategories.length === 0) {
      return left(new OneOrMoreWorkspaceNotFoundError())
    }

    const categoryPromises = categoryOrCategories
      .filter((workspaceId) => workspaceId)
      .map((workspaceId) => this.workspaceRepository.findById(workspaceId))

    const categories = await Promise.all(categoryPromises)

    if (categories.some((category) => category === null)) {
      return left(
        categories.length > 1
          ? new OneOrMoreWorkspaceNotFoundError()
          : new WorkspaceNotFoundError(),
      )
    }

    await this.workspaceRepository.deleteMany(categoryOrCategories)

    return right(null)
  }
}
