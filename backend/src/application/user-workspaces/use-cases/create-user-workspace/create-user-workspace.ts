import { Either, left, right } from '@/core/logic/either'
import { UserWorkspace } from '../../domain/user-workspace'
import { IUserWorkspacesRepository } from '../../repositories/IUserWorkspaceRepository'
import { UserDoesNotExistError } from '../../../workspaces/use-cases/errors/UserDoesNotExistError'
import INVITE_STATUSES from '../../domain/invite-status.enum'
import { ICreateUserWorkspaceRolesUseCase } from '@/application/user-workspace-roles/use-cases/ICreateUserWorkspaceRolesUseCase'
import ROLES from '@/application/user-workspace-roles/domain/roles.schema'
import { ICreateUserWorkspacesUseCase } from '../ICreateUserWorkspacesUseCase'

type CreateUserWorkspaceRequest = {
  workspaceId: string
  userId: string
  status: INVITE_STATUSES
}

type CreateWorkspaceResponse = Either<UserDoesNotExistError, UserWorkspace>

export class CreateUserWorkspace implements ICreateUserWorkspacesUseCase {
  constructor(
    private userWorkspacesRepository: IUserWorkspacesRepository,
    private createUserWorkspaceRolesUseCase: ICreateUserWorkspaceRolesUseCase,
  ) {}

  async execute({
    workspaceId,
    userId,
    status,
  }: CreateUserWorkspaceRequest): Promise<CreateWorkspaceResponse> {
    const userWorkspaceOrError = UserWorkspace.create({
      workspaceId,
      userId,
      status,
    })

    if (userWorkspaceOrError.isLeft()) {
      return left(userWorkspaceOrError.value)
    }

    const userWorkspace = userWorkspaceOrError.value

    await this.userWorkspacesRepository.create(userWorkspace)

    await this.createUserWorkspaceRolesUseCase.execute({
      userWorkspaceId: userWorkspace.id,
      roles: [ROLES.ADMIN],
    })

    return right(userWorkspace)
  }
}
