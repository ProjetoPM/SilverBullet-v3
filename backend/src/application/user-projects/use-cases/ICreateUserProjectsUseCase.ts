import { UserProject } from '../domain/user-project'
import { Either } from '@/core/logic/either'
import InviteStatus from '../domain/invite-status.enum'
import { ProjectNotCreatedError } from './create-user-project/errors/ProjectNotCreatedError'

type CreateProjectResponse = Either<ProjectNotCreatedError, UserProject>

export interface ICreateUserProjectsUseCase {
  execute({
    projectId,
    userId,
    status,
  }: {
    projectId: string
    userId: string
    status: InviteStatus
  }): Promise<CreateProjectResponse>
}
