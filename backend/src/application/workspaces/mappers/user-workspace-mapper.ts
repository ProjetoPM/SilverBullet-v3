import { UserWorkspace as PersistenceUserWorkspace } from '@prisma/client'
import { UserWorkspace } from '../domain/user-workspace'
import { t } from 'i18next'
import InviteStatus from '../domain/invite-statuses.enum'

export class UserWorkspaceMapper {
  static toDomain(raw: PersistenceUserWorkspace) {
    const workspaceOrError = UserWorkspace.create({
      workspaceId: raw.workspace_id,
      userId: raw.user_id,
      status: raw.status as unknown as InviteStatus,
    })

    if (workspaceOrError.isLeft()) {
      throw new Error(t('errors.invalid_workspace'))
    }

    if (workspaceOrError.isRight()) {
      return workspaceOrError.value
    }
    return null
  }

  static async toPersistence(userWorkspace: UserWorkspace) {
    return {
      workspace_id: userWorkspace.props.workspaceId,
      user_id: userWorkspace.props.userId,
      status: userWorkspace.props.status,
    }
  }
}
