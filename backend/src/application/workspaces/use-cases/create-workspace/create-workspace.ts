import { Either, left, right } from '@/core/logic/either'

import { PlanTypes } from '../../domain/plan-types.enum'
import { PlanStatuses } from '../../domain/plan-statuses.enum'
import { InviteStatuses } from '../../domain/invite-statuses.enum'

import { WorkspaceRoles } from '../../domain/workspace-roles.schema'
import { Workspace } from '../../domain/workspace'

import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'

import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { Metric } from '../../domain/metric'

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

    const metrics = [
      Metric.create({
        name: 'NOK',
        value: 0,
      }).value as Metric,
      Metric.create({
        name: 'PNOK',
        value: 2.5,
      }).value as Metric,
      Metric.create({
        name: 'POK',
        value: 5,
      }).value as Metric,
      Metric.create({
        name: 'PTOK',
        value: 7.5,
      }).value as Metric,
      Metric.create({
        name: 'TOK',
        value: 10,
      }).value as Metric,
    ]

    const workspaceOrError = Workspace.create(
      {
        name,
        description,
        plan: PlanTypes.FREE,
        planStatus: PlanStatuses.ACTIVE,
      },
      undefined,
      metrics,
    )

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
