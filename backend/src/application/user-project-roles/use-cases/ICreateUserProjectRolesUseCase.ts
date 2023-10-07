import { Either } from '@/core/logic/either'
import PROJECT_ROLES from '../domain/roles.schema'
import { UserDoesNotExistError } from '@/application/workspaces/use-cases/errors/UserDoesNotExistError'

type CreateUserProjectRolesResponse = Either<UserDoesNotExistError, boolean>

export interface ICreateUserProjectRolesUseCase {
  execute({
    userProjectId,
    roles,
  }: {
    userProjectId: string
    roles: PROJECT_ROLES[]
  }): Promise<CreateUserProjectRolesResponse>
}
