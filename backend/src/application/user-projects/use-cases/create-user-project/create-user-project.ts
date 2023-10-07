import { Either, left, right } from '@/core/logic/either'
import { UserProject } from '../../domain/user-project'
import { IUserProjectsRepository } from '../../repositories/IUserProjectRepository'
import INVITE_STATUSES from '../../domain/invite-status.enum'
import { ICreateUserProjectRolesUseCase } from '@/application/user-project-roles/use-cases/ICreateUserProjectRolesUseCase'
import ROLES from '@/application/user-project-roles/domain/roles.schema'
import { ICreateUserProjectsUseCase } from '../ICreateUserProjectsUseCase'
import { ProjectNotCreatedError } from './errors/ProjectNotCreatedError'

type CreateUserProjectRequest = {
  projectId: string
  userId: string
  status: INVITE_STATUSES
}

type CreateProjectResponse = Either<ProjectNotCreatedError, UserProject>

export class CreateUserProject implements ICreateUserProjectsUseCase {
  constructor(
    private userProjectsRepository: IUserProjectsRepository,
    private createUserProjectRolesUseCase: ICreateUserProjectRolesUseCase,
  ) {}

  async execute({
    projectId,
    userId,
    status,
  }: CreateUserProjectRequest): Promise<CreateProjectResponse> {
    const userProjectOrError = UserProject.create({
      projectId,
      userId,
      status,
    })

    if (userProjectOrError.isLeft()) {
      return left(userProjectOrError.value)
    }

    const userProject = userProjectOrError.value

    const id = await this.userProjectsRepository.create(userProject)

    // @TODO
    // Inverter a lógica
    if (id) {
      await this.createUserProjectRolesUseCase.execute({
        userProjectId: id,
        roles: [ROLES.ADMIN, ROLES.PROJECT_MANAGER],
      })
    }

    return right(userProject)
  }
}
