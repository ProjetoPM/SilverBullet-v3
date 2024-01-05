import { Either, left, right } from '@/core/logic/either'
import { WorkspaceRoles } from '../../domain/workspace-roles.schema'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'

type Emails = {
  email: string
  role: WorkspaceRoles
}

type SendInviteRequest = {
  data: Emails[]
  userId: string
  workspaceId: string
}

type ForgotPassWordResponse = Either<UserDoesNotExistError, null>

export class SendInvite {
  constructor(
    private usersRepository: IUsersRepository,
    private workspaceRepository: IWorkspacesRepository,
  ) {}

  async execute({
    userId,
    workspaceId,
    data,
  }: SendInviteRequest): Promise<ForgotPassWordResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    for (const item of data) {
      const { email, role } = item
      const user = await this.usersRepository.findByEmail(email)
      const userId = user == null ? null : user.id

      await this.workspaceRepository.sendInvite(
        workspaceId,
        email,
        role,
        userId,
      )
    }

    return right(null)
  }
}
