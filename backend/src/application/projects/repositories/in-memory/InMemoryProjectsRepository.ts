import { User } from '@/application/users/domain/user'
import { Project } from '../../domain/project'
import { IProjectsRepository } from '../IProjectsRepository'
import { ProjectRoles } from '../../domain/project-roles.schema'
import { InviteStatuses } from '../../domain/invite-statuses.enum'

type UserProject = {
  userId: string
  projectId: string
  status: InviteStatuses
}

type UserProjectRole = {
  userId: string
  projectId: string
  role: ProjectRoles
}

export class InMemoryProjectsRepository implements IProjectsRepository {
  constructor(
    public projects: Project[] = [],
    public userProjects: UserProject[] = [],
    public userProjectRoles: UserProjectRole[] = [],
  ) {}
  listUserProjectsByWorkspaceId(
    workspaceId: string,
    userId: string,
  ): Promise<Project[]> {
    throw new Error('Method not implemented.')
  }
  async findByName(name: string): Promise<Project | null> {
    const project = this.projects.find((project) => project.props.name === name)

    if (!project) return null

    return project
  }

  async create(
    project: Project,
    user: User,
    status: InviteStatuses,
    roles: ProjectRoles[],
  ): Promise<void> {
    this.projects.push(project)
    this.userProjects.push({ userId: user.id, projectId: project.id, status })

    roles.map((role) => {
      this.userProjectRoles.push({
        userId: user.id,
        projectId: project.id,
        role,
      })
    })
  }

  async update(project: Project): Promise<void> {
    const index = this.projects.findIndex(
      (projectItem) => projectItem.id === project.id,
    )

    this.projects[index] = project
  }

  async findById(id: string): Promise<Project | null> {
    const project = this.projects.find((project) => project.id === id)

    if (!project) return null

    return project
  }

  async existsByNameAndId(
    name: string,
    workspaceId: string,
    id: string,
  ): Promise<boolean> {
    const project = this.projects.find(
      (project) =>
        project.props.name === name &&
        project.props.workspaceId === workspaceId &&
        project.id !== id,
    )

    return !!project
  }

  async verifyUserBelongsToProject(
    userId: string,
    projectId: string,
  ): Promise<boolean> {
    const data = this.userProjects.find(
      (userProject) =>
        userProject.projectId === projectId && userProject.userId === userId,
    )

    return !!data
  }
}
