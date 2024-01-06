import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListInvite } from './list-invite'

type ListInviteControllerRequest = {
  currentUserId: string
}
export class ListInviteController implements Controller {
  constructor(private listInvite: ListInvite) {}

  async handle({
    currentUserId: userId,
  }: ListInviteControllerRequest): Promise<HttpResponse> {
    const invites = await this.listInvite.execute({ userId })
    return ok({ invites })
  }
}
