import { Either, left, right } from '@/core/logic/either'

import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { Project } from '../../domain/project'
import { ProjectRoles } from '../../domain/project-roles.schema'

import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'

import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { ProjectWithSameNameExistsError } from './errors/ProjectWithSameNameExistsError'
import { UserDoesNotBelongToWorkspaceError } from './errors/UserDoesNotBelongToWorkspaceError'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { WorkspaceDoesNotExistError } from './errors/WorkspaceDoesNotExistError'

type CreateProjectRequest = {
  name: string
  description?: string
  currentWorkspaceId: string
  currentUserId: string
}

type CreateProjectResponse = Either<
  | UserDoesNotExistError
  | WorkspaceDoesNotExistError
  | UserDoesNotBelongToWorkspaceError
  | ProjectWithSameNameExistsError,
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
    currentWorkspaceId,
    currentUserId: userId,
  }: CreateProjectRequest): Promise<CreateProjectResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const workspaceExists =
      await this.workspacesRepository.exists(currentWorkspaceId)

    if (!workspaceExists) {
      return left(new WorkspaceDoesNotExistError())
    }

    const userInWorkspace =
      await this.workspacesRepository.verifyUserBelongsToWorkspace(
        user.id,
        currentWorkspaceId,
      )

    if (!userInWorkspace) {
      return left(new UserDoesNotBelongToWorkspaceError())
    }

    const projectWithSameName = await this.projectsRepository.findByName(name)

    if (projectWithSameName) {
      return left(new ProjectWithSameNameExistsError())
    }

    const projectOrError = Project.create({
      name,
      description,
      workspaceId: currentWorkspaceId,
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
