import { UserWorkspaceRole as PersistenceUserWorkspaceRole } from '@prisma/client'
import { t } from 'i18next'
import { UserWorkspaceRole } from '../domain/user-workspace-role'
import ROLES from '../domain/roles.schema'

export class UserWorkspaceRoleMapper {
  static toDomain(raw: PersistenceUserWorkspaceRole) {
    const workspaceOrError = UserWorkspaceRole.create({
      userId: raw.user_id,
      workspaceId: raw.workspace_id,
      role: raw.role as unknown as ROLES,
    })

    if (workspaceOrError.isLeft()) {
      throw new Error(t('errors.invalid_workspace'))
    }

    if (workspaceOrError.isRight()) {
      return workspaceOrError.value
    }
    return null
  }

  static async toPersistence(userWorkspaceRole: UserWorkspaceRole) {
    return {
      user_id: userWorkspaceRole.props.userId,
      workspace_id: userWorkspaceRole.props.workspaceId,
      role: userWorkspaceRole.props.role,
    }
  }
}
