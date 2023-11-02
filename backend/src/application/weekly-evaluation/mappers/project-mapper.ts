import { Project as PersistenceProject } from '@prisma/client'
import { Project } from '../domain/project'
import { t } from 'i18next'

export class ProjectMapper {
  static toDomain(raw: PersistenceProject) {
    const projectOrError = Project.create(
      {
        name: raw.name,
        description: raw.description,
        workspaceId: raw.workspace_id,
      },
      raw.id,
    )

    if (projectOrError.isLeft()) {
      throw new Error(t('errors.invalid_project'))
    }

    return projectOrError.value
  }

  static async toPersistence(project: Project) {
    return {
      id: project.id,
      name: project.props.name,
      description: project.props.description,
      workspace_id: project.props.workspaceId,
    }
  }
}
