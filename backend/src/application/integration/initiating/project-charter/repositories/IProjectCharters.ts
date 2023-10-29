import { ProjectCharter } from '../domain/project-charter'

export interface IProjectChartersRepository {
  create(projectCharter: ProjectCharter): Promise<void>
  countProjectChartersByProjectId(projectId: string): Promise<number>
  deleteAll(): Promise<void>
}
