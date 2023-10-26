import { Project } from '../../domain/project'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'

type ListProjectRequest = {
  currentUserId: string
  workspaceId: string
}
type ListProjectResponse = Project[]

export class ListProject {
  constructor(private projectsRepository: IProjectsRepository) {}

  async execute({
    currentUserId: userId,
    workspaceId,
  }: ListProjectRequest): Promise<ListProjectResponse> {
    const projects =
      await this.projectsRepository.listUserProjectsByWorkspaceId(
        workspaceId,
        userId,
      )
    return projects
  }
}
