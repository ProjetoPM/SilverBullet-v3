// import { UserWorkspace } from '../domain/user-workspace'
import { Either } from '@/core/logic/either'
import ROLES from '../domain/roles.schema'

type CreateUserWorkspaceRolesResponse = Either<null, boolean>

export interface ICreateUserWorkspaceRolesUseCase {
  execute({
    userWorkspaceId,
    roles,
  }: {
    userWorkspaceId: string
    roles: ROLES[]
  }): Promise<CreateUserWorkspaceRolesResponse>
}
