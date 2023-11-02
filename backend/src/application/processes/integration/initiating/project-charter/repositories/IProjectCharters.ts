import { ProjectCharter } from '../domain/project-charter'

export interface IProjectChartersRepository {
  create(projectCharter: ProjectCharter): Promise<void>
  update(projectCharter: ProjectCharter): Promise<void>
  findById(id: string): Promise<ProjectCharter | null>
  countProjectChartersByProjectId(projectId: string): Promise<number>
  deleteAll(): Promise<void>
}
