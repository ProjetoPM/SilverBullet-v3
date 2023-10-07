import { Either, left, right } from '@/core/logic/either'
import { UserWorkspaceRole } from '../../domain/user-workspace-role'
import { IUserWorkspaceRolesRepository } from '../../repositories/IUserWorkspaceRolesRepository'
import ROLES from '../../domain/roles.schema'
import { ICreateUserWorkspaceRolesUseCase } from '../ICreateUserWorkspaceRolesUseCase'

type CreateUserWorkspaceRoleRequest = {
  userWorkspaceId: string
  roles: ROLES[]
}

type CreateUserWorkspaceRolesResponse = Either<null, boolean>

export class CreateUserWorkspaceRoles
  implements ICreateUserWorkspaceRolesUseCase
{
  constructor(
    private userWorkspaceRolesRepository: IUserWorkspaceRolesRepository,
  ) {}

  async execute({
    userWorkspaceId,
    roles,
  }: CreateUserWorkspaceRoleRequest): Promise<CreateUserWorkspaceRolesResponse> {
    await Promise.all(
      roles.map(async (role) => {
        const userWorkspaceRoleOrError = UserWorkspaceRole.create({
          userWorkspaceId,
          role,
        })

        if (userWorkspaceRoleOrError.isLeft()) {
          return left(userWorkspaceRoleOrError.value)
        }

        const userWorkspaceRole = userWorkspaceRoleOrError.value

        await this.userWorkspaceRolesRepository.create(userWorkspaceRole)
      }),
    )

    return right(true)
  }
}
