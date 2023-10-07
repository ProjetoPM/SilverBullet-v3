import { Project } from '../domain/project'

export interface IProjectsRepository {
  create(project: Project): Promise<void>
  findById(id: string): Promise<Project | null>
}
