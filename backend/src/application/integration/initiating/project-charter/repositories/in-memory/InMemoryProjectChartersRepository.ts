import { ProjectCharter } from '../../domain/project-charter'
import { IProjectChartersRepository } from '../IProjectCharters'

export class InMemoryProjectChartersRepository
  implements IProjectChartersRepository
{
  constructor(public projectCharters: ProjectCharter[] = []) {}

  async create(projectCharter: ProjectCharter): Promise<void> {
    this.projectCharters.push(projectCharter)
  }

  async countProjectChartersByProjectId(projectId: string): Promise<number> {
    return this.projectCharters.filter(
      (project) => project.props.projectId === projectId,
    ).length
  }
}
