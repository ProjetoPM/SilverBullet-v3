import { Either, left, right } from '@/core/logic/either'

import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'

import { UserDoesNotExistError } from './errors/UserDoesNotExistError'

type CreateWorkspaceRequest = {
  name: string
  description?: string
  currentUserId: string
}

type CreateWorkspaceResponse = Either<UserDoesNotExistError, Workspace>

export class CreateWorkspace {
  constructor(
    private workspacesRepository: IWorkspacesRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    description,
    currentUserId: userId,
  }: CreateWorkspaceRequest): Promise<CreateWorkspaceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const workspaceOrError = Workspace.create({
      name,
      description,
      plan: PlanTypes.FREE,
      planStatus: PlanStatuses.ACTIVE,
    })

    if (workspaceOrError.isLeft()) {
      return left(workspaceOrError.value)
    }

    const workspace = workspaceOrError.value

    await this.workspacesRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    return right(workspace)
  }
}
