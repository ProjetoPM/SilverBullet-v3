import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { SendInvite } from './send-invite'
import { WorkspaceRoles } from '../../domain/workspace-roles.schema'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { request } from 'http'

type Emails = {
  email: string
  role: WorkspaceRoles
}

type SendInviteControllerRequest = {
  data: Emails[]
  currentUserId: string
  currentWorkspaceId: string
}

export class SendInviteController implements Controller {
  constructor(
    private readonly validator: Validator<SendInviteControllerRequest>,
    private sendInvite: SendInvite,
  ) {}
  async handle({
    currentUserId,
    currentWorkspaceId,
    ...request
  }: SendInviteControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate({
      currentUserId,
      currentWorkspaceId,
      ...request,
    })

    if (validated.isLeft()) {
      return clientError(validated.value)
    }
    const result = await this.sendInvite.execute({
      userId: currentUserId,
      workspaceId: currentWorkspaceId,
      ...request,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserDoesNotExistError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('workspace.invite') })
  }
}
