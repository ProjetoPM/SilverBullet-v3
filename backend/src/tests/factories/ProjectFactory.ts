import { Project } from '@/application/projects/domain/project'

type ProjectOverrides = {
  name?: string
  description?: string
  workspaceId: string
}
export class ProjectFactory {
  static create(overrides: ProjectOverrides) {
    const project = Project.create({
      name: overrides.name || 'test-name',
      description: overrides.description || 'test-description',
      workspaceId: overrides.workspaceId,
    })

    return project.value as Project
  }
}
