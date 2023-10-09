import { UserProjectRole as PersistenceUserProjectRole } from '@prisma/client'
import { t } from 'i18next'
import { UserProjectRole } from '../domain/user-project-role'
import PROJECT_ROLES from '../domain/roles.schema'

export class UserProjectRoleMapper {
  static toDomain(raw: PersistenceUserProjectRole) {
    const projectOrError = UserProjectRole.create({
      userProjectId: raw.user_project_id,
      role: raw.role as unknown as PROJECT_ROLES,
    })

    if (projectOrError.isLeft()) {
      throw new Error(t('errors.invalid_project'))
    }

    if (projectOrError.isRight()) {
      return projectOrError.value
    }
    return null
  }

  static async toPersistence(userProjectRole: UserProjectRole) {
    return {
      user_project_id: userProjectRole.props.userProjectId,
      role: userProjectRole.props.role,
    }
  }
}
