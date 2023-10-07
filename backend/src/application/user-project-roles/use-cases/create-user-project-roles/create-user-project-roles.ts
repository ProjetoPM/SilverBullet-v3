import { Either, left, right } from '@/core/logic/either'
import { UserProjectRole } from '../../domain/user-project-role'
import { IUserProjectRolesRepository } from '../../repositories/IUserProjectRolesRepository'
import { UserDoesNotExistError } from '../../../workspaces/use-cases/errors/UserDoesNotExistError'
import ROLES from '../../domain/roles.schema'
import { ICreateUserProjectRolesUseCase } from '../ICreateUserProjectRolesUseCase'

type CreateUserProjectRoleRequest = {
  userProjectId: string
  roles: ROLES[]
}

type CreateUserProjectRolesResponse = Either<UserDoesNotExistError, boolean>

export class CreateUserProjectRoles implements ICreateUserProjectRolesUseCase {
  constructor(
    private userProjectRolesRepository: IUserProjectRolesRepository,
  ) {}

  async execute({
    userProjectId,
    roles,
  }: CreateUserProjectRoleRequest): Promise<CreateUserProjectRolesResponse> {
    await Promise.all(
      roles.map(async (role) => {
        const userProjectRoleOrError = UserProjectRole.create({
          userProjectId,
          role,
        })

        if (userProjectRoleOrError.isLeft()) {
          return left(userProjectRoleOrError.value)
        }

        const userProjectRole = userProjectRoleOrError.value

        await this.userProjectRolesRepository.create(userProjectRole)
      }),
    )

    return right(true)
  }
}
