import { Either, left, right } from '@/core/logic/either'
import { Project } from '../../domain/project'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { WorkspaceDoesNotExistError } from '../errors/WorkspaceDoesNotExistError'
import { UserProject } from '../../domain/user-project'
import InviteStatuses from '../../domain/invite-statuses.enum'
import { UserProjectRole } from '../../domain/user-project-role'
import ProjectRoles from '../../domain/roles.schema'
import { UserDoesNotExistError } from '../errors/UserDoesNotExistError'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { UserDoesNotBelongToWorkspaceError } from '../errors/UserDoesNotBelongToWorkspaceError'
import { IUserWorkspacesRepository } from '../../repositories/IUserWorkspacesRepository'

type CreateProjectRequest = {
  name: string
  description?: string
  workspaceId: string
  currentUserId: string
}

type CreateProjectResponse = Either<
  | UserDoesNotExistError
  | WorkspaceDoesNotExistError
  | UserDoesNotBelongToWorkspaceError,
  Project
>

export class CreateProject {
  constructor(
    private projectsRepository: IProjectsRepository,
    private usersRepository: IUsersRepository,
    private workspacesRepository: IWorkspacesRepository,
    private userWorkspacesRepository: IUserWorkspacesRepository,
  ) {}

  async execute({
    name,
    description,
    workspaceId,
    currentUserId: userId,
  }: CreateProjectRequest): Promise<CreateProjectResponse> {
    let projectRoles: UserProjectRole[] = []

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const workspace = await this.workspacesRepository.findById(workspaceId)

    if (!workspace) {
      return left(new WorkspaceDoesNotExistError())
    }

    const userInWorkspace =
      await this.userWorkspacesRepository.verifyActiveWorkspace(
        user.id,
        workspace.id,
      )

    if (!userInWorkspace) {
      return left(new UserDoesNotBelongToWorkspaceError())
    }

    const projectOrError = Project.create({
      name,
      description,
      workspaceId,
    })

    if (projectOrError.isLeft()) {
      return left(projectOrError.value)
    }

    const project = projectOrError.value

    const userProjectOrError = UserProject.create({
      userId: userId,
      projectId: project.id,
      status: InviteStatuses.ACTIVE,
    })

    if (userProjectOrError.isLeft()) {
      return left(userProjectOrError.value)
    }

    const userProject = userProjectOrError.value

    const userProjectRoleOrError = UserProjectRole.create({
      userId: userId,
      projectId: project.id,
      role: ProjectRoles.ADMIN,
    })

    if (userProjectRoleOrError.isLeft()) {
      return left(userProjectRoleOrError.value)
    }

    const userProjectRole = userProjectRoleOrError.value
    projectRoles.push(userProjectRole)

    const userProjectSecondRoleOrError = UserProjectRole.create({
      userId: userId,
      projectId: project.id,
      role: ProjectRoles.PROJECT_MANAGER,
    })

    if (userProjectSecondRoleOrError.isLeft()) {
      return left(userProjectSecondRoleOrError.value)
    }

    const userProjectSecondRole = userProjectSecondRoleOrError.value
    projectRoles.push(userProjectSecondRole)

    await this.projectsRepository.create(project, userProject, projectRoles)

    return right(project)
  }
}
