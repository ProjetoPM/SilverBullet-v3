import { ProjectCharter } from '../../domain/project-charter'
import { IProjectChartersRepository } from '../IProjectCharters'

export class InMemoryProjectChartersRepository
  implements IProjectChartersRepository
{
  constructor(public projectCharters: ProjectCharter[] = []) {}

  async create(projectCharter: ProjectCharter): Promise<void> {
    this.projectCharters.push(projectCharter)
  }
  async update(projectCharter: ProjectCharter): Promise<void> {
    const index = this.projectCharters.findIndex(
      (projectCharterItem) => projectCharterItem.id === projectCharter.id,
    )

    this.projectCharters[index] = projectCharter
  }

  async findById(id: string): Promise<ProjectCharter | null> {
    return (
      this.projectCharters.find((projectCharter) => projectCharter.id === id) ||
      null
    )
  }

  async countProjectChartersByProjectId(projectId: string): Promise<number> {
    return this.projectCharters.filter(
      (project) => project.props.projectId === projectId,
    ).length
  }

  async deleteAll(): Promise<void> {
    this.projectCharters = []
  }
}
