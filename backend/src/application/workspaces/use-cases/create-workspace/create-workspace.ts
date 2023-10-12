import { Either, left, right } from '@/core/logic/either'

import { PlanTypes } from '../../domain/plans.enum'
import { PlanStatuses } from '../../domain/plan-statuses.enum'
import { InviteStatuses } from '../../domain/invite-statuses.enum'

import { Roles } from '../../domain/roles.schema'
import { Workspace } from '../../domain/workspace'

import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'

import { UserDoesNotExistError } from '../errors/UserDoesNotExistError'

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

    if (!user) return left(new UserDoesNotExistError())

    const plan = PlanTypes.FREE
    const planStatus = PlanStatuses.ACTIVE
    const workspaceOrError = Workspace.create({
      name,
      description,
      plan,
      planStatus,
    })

    if (workspaceOrError.isLeft()) {
      return left(workspaceOrError.value)
    }

    const workspace = workspaceOrError.value

    await this.workspacesRepository.create(workspace, user, Roles.ADMIN)

    return right(workspace)
  }
}
