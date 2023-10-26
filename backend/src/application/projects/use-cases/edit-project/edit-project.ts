import { Either, left, right } from '@/core/logic/either'

import { Project } from '../../domain/project'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'

import { UserDoesNotExistError } from '../errors/UserDoesNotExistError'
import { ProjectWithSameNameExistsError } from '../errors/ProjectWithSameNameExistsError'
import { UserDoesNotBelongToProjectError } from '../errors/UserDoesNotBelongToProjectError'
import { ProjectDoesNotExistError } from '../errors/ProjectDoesNotExistError'

type EditProjectRequest = {
  name: string
  description?: string
  currentUserId: string
  projectId: string
}

type EditProjectResponse = Either<
  | UserDoesNotExistError
  | UserDoesNotBelongToProjectError
  | ProjectDoesNotExistError
  | ProjectWithSameNameExistsError,
  Project
>

export class EditProject {
  constructor(
    private projectsRepository: IProjectsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    description,
    projectId,
    currentUserId: userId,
  }: EditProjectRequest): Promise<EditProjectResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const dbProject = await this.projectsRepository.findById(projectId)

    if (!dbProject) {
      return left(new ProjectDoesNotExistError())
    }

    const projectWithSameNameAlreadyExists =
      await this.projectsRepository.existsByNameAndId(
        name,
        dbProject.props.workspaceId,
        projectId,
      )

    if (projectWithSameNameAlreadyExists) {
      return left(new ProjectWithSameNameExistsError())
    }

    const projectOrError = Project.create(
      {
        name,
        description,
        workspaceId: dbProject.props.workspaceId,
      },
      projectId,
    )

    if (projectOrError.isLeft()) {
      return left(projectOrError.value)
    }

    const project = projectOrError.value

    await this.projectsRepository.update(project)

    return right(project)
  }
}
