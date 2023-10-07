import { UserDoesNotExistError } from '@/application/workspaces/use-cases/errors/UserDoesNotExistError'
import { UserWorkspace } from '../domain/user-workspace'
import { Either } from '@/core/logic/either'
import InviteStatus from '../domain/invite-status.enum'

type CreateWorkspaceResponse = Either<UserDoesNotExistError, UserWorkspace>

export interface ICreateUserWorkspacesUseCase {
  execute({
    workspaceId,
    userId,
    status,
  }: {
    workspaceId: string
    userId: string
    status: InviteStatus
  }): Promise<CreateWorkspaceResponse>
}
