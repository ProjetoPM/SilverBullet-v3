import { Project } from '../../domain/project'
import { IProjectsRepository } from '../IProjectsRepository'

export class InMemoryProjectsRepository implements IProjectsRepository {
  constructor(public projects: Project[] = []) {}

  async save(project: Project): Promise<void> {
    const projectIndex = this.projects.findIndex(
      (project) => project.id === project.id,
    )
    this.projects[projectIndex] = project
  }

  async create(project: Project): Promise<string | null> {
    this.projects.push(project)

    const dbProject = this.projects.pop()

    if (!dbProject) return null

    return dbProject.id
  }

  async findById(id: string): Promise<Project | null> {
    const project = this.projects.find((project) => project.id === id)

    if (!project) return null

    return project
  }
}
