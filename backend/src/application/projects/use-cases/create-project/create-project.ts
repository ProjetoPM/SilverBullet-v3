import { Either, left, right } from '@/core/logic/either'
import { Project } from '../../domain/project'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { WorkspaceDoesNotExistError } from '../errors/WorkspaceDoesNotExistError'
import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { ProjectRoles } from '../../domain/project-roles.schema'
import { UserDoesNotExistError } from '../errors/UserDoesNotExistError'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { UserDoesNotBelongToWorkspaceError } from '../errors/UserDoesNotBelongToWorkspaceError'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'

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
  ) {}

  async execute({
    name,
    description,
    workspaceId,
    currentUserId: userId,
  }: CreateProjectRequest): Promise<CreateProjectResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const workspace = await this.workspacesRepository.findById(workspaceId)

    if (!workspace) {
      return left(new WorkspaceDoesNotExistError())
    }

    const userInWorkspace =
      await this.workspacesRepository.verifyActiveWorkspace(
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

    await this.projectsRepository.create(project, user, [
      ProjectRoles.ADMIN,
      ProjectRoles.PROJECT_MANAGER,
    ])

    return right(project)
  }
}
