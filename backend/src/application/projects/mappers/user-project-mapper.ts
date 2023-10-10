import { UserProject as PersistenceUserProject } from '@prisma/client'
import { UserProject } from '../domain/user-project'
import { t } from 'i18next'
import InviteStatus from '../domain/invite-statuses.enum'

export class UserProjectMapper {
  static toDomain(raw: PersistenceUserProject) {
    const projectOrError = UserProject.create({
      projectId: raw.project_id,
      userId: raw.user_id,
      status: raw.status as unknown as InviteStatus,
    })

    if (projectOrError.isLeft()) {
      throw new Error(t('errors.invalid_project'))
    }

    if (projectOrError.isRight()) {
      return projectOrError.value
    }
    return null
  }

  static async toPersistence(userProject: UserProject) {
    return {
      project_id: userProject.props.projectId,
      user_id: userProject.props.userId,
      status: userProject.props.status,
    }
  }
}
