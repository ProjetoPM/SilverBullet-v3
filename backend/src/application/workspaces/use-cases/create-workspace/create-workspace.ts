import { Either, left, right } from '@/core/logic/either'

import PLANS from '../../domain/plans.enum'
import PLAN_STATUSES from '../../domain/plan-statuses.enum'
import InviteStatuses from '../../domain/invite-statuses.enum'

import Roles from '../../domain/roles.schema'
import { Workspace } from '../../domain/workspace'
import { UserWorkspace } from '../../domain/user-workspace'
import { UserWorkspaceRole } from '../../domain/user-workspace-role'

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

    const plan = PLANS.FREE
    const planStatus = PLAN_STATUSES.ACTIVE
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

    const userWorkspaceOrError = UserWorkspace.create({
      userId: userId,
      workspaceId: workspace.id,
      status: InviteStatuses.ACTIVE,
    })

    if (userWorkspaceOrError.isLeft()) {
      return left(userWorkspaceOrError.value)
    }

    const userWorkspace = userWorkspaceOrError.value

    const userWorkspaceRoleOrError = UserWorkspaceRole.create({
      userId: userId,
      workspaceId: workspace.id,
      role: Roles.ADMIN,
    })

    if (userWorkspaceRoleOrError.isLeft()) {
      return left(userWorkspaceRoleOrError.value)
    }

    const userWorkspaceRole = userWorkspaceRoleOrError.value

    await this.workspacesRepository.create(
      workspace,
      userWorkspace,
      userWorkspaceRole,
    )

    return right(workspace)
  }
}
