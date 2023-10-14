import { Either, left, right } from '@/core/logic/either'

import { Project } from '../../domain/project'
import { ProjectRoles } from '../../domain/project-roles.schema'
import { InviteStatuses } from '../../domain/invite-statuses.enum'

import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'

import { UserDoesNotExistError } from '../errors/UserDoesNotExistError'
import { WorkspaceDoesNotExistError } from '../errors/WorkspaceDoesNotExistError'
import { UserDoesNotBelongToWorkspaceError } from '../errors/UserDoesNotBelongToWorkspaceError'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'

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

    const workspaceExists = await this.workspacesRepository.exists(workspaceId)

    if (!workspaceExists) {
      return left(new WorkspaceDoesNotExistError())
    }

    const userInWorkspace =
      await this.workspacesRepository.verifyUserBelongsToWorkspace(
        user.id,
        workspaceId,
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

    await this.projectsRepository.create(project, user, InviteStatuses.ACTIVE, [
      ProjectRoles.ADMIN,
      ProjectRoles.PROJECT_MANAGER,
    ])

    return right(project)
  }
}
