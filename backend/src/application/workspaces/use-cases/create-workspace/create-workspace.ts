import { Either, left, right } from '@/core/logic/either'
import { Workspace } from '../../domain/workspace'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { UserDoesNotExistError } from '../errors/UserDoesNotExistError'
import PLAN_STATUSES from '../../domain/plan-statuses.enum'
import INVITE_STATUSES from '@/application/user-workspaces/domain/invite-status.enum'
import PLANS from '../../domain/plans.enum'
import { ICreateUserWorkspacesUseCase } from '@/application/user-workspaces/use-cases/ICreateUserWorkspacesUseCase'
import { WorkspaceNotCreatedError } from '../errors/WorkspaceNotCreatedError'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'

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
    private createUserWorkspaces: ICreateUserWorkspacesUseCase,
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

    await this.workspacesRepository.create(workspace)

    await this.createUserWorkspaces.execute({
      workspaceId: workspace.id,
      userId,
      status: INVITE_STATUSES.ACTIVE,
    })

    return right(workspace)
  }
}
