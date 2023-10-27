import { Either, left, right } from '@/core/logic/either'

import { PlanTypes } from '../../domain/plan-types.enum'
import { PlanStatuses } from '../../domain/plan-statuses.enum'
import { InviteStatuses } from '../../domain/invite-statuses.enum'

import { WorkspaceRoles } from '../../domain/workspace-roles.schema'
import { Workspace } from '../../domain/workspace'

import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'

import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { WorkspaceDoesNotExistError } from './errors/WorkspaceDoesNotExistError'

type EditWorkspaceRequest = {
  workspaceId: string
  name: string
  description?: string
  currentUserId: string
}

type EditWorkspaceResponse = Either<UserDoesNotExistError, Workspace>

export class EditWorkspace {
  constructor(
    private workspacesRepository: IWorkspacesRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    currentUserId: userId,
    workspaceId,
    ...request
  }: EditWorkspaceRequest): Promise<EditWorkspaceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    if (!workspaceId) {
      return left(new WorkspaceDoesNotExistError())
    }

    const workspaceExists =
      await this.workspacesRepository.findById(workspaceId)

    if (!workspaceExists) {
      return left(new WorkspaceDoesNotExistError())
    }

    const workspaceOrError = Workspace.create(
      {
        ...request,
        plan: PlanTypes.FREE,
        planStatus: PlanStatuses.ACTIVE,
      },
      workspaceId,
    )

    if (workspaceOrError.isLeft()) {
      return left(workspaceOrError.value)
    }

    const workspace = workspaceOrError.value
    await this.workspacesRepository.update(workspace)

    return right(workspace)
  }
}
