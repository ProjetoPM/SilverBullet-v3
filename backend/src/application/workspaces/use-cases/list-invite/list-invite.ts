import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'

type ListInviteResponse = any[]
type ListInviteRequest = {
  userId: string
}

export class ListInvite {
  constructor(private workspacesRepository: IWorkspacesRepository) {}

  async execute({ userId }: ListInviteRequest): Promise<ListInviteResponse> {
    const invites = await this.workspacesRepository.listInvites(userId)
    return invites
  }
}
