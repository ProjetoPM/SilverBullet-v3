import { beforeEach, describe, expect, test } from 'vitest'
import { GetProjectCharter } from './get-project-charter'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { InMemoryWorkspacesRepository } from '@/application/workspaces/repositories/in-memory/InMemoryWorkspacesRepository'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { ProjectFactory } from '@/tests/factories/ProjectFactory'
import { IProjectChartersRepository } from '../../repositories/IProjectChartersRepository'
import { IProjectsRepository } from '@/application/projects/repositories/IProjectsRepository'
import { InMemoryProjectsRepository } from '@/application/projects/repositories/in-memory/InMemoryProjectsRepository'
import { InMemoryProjectChartersRepository } from '../../repositories/in-memory/InMemoryProjectChartersRepository'
import { InviteStatuses } from '@/application/workspaces/domain/invite-statuses.enum'
import { ProjectRoles } from '@/application/projects/domain/project-roles.schema'
import { ProjectCharterFactory } from '@/tests/factories/ProjectCharterFactory'

let projectCharterRepository: IProjectChartersRepository
let workspaceRepository: IWorkspacesRepository
let projectRepository: IProjectsRepository
let usersRepository: IUsersRepository
let getProjectCharter: GetProjectCharter

describe('Get a project', () => {
  const user = UserFactory.create()

  beforeEach(async () => {
    projectRepository = new InMemoryProjectsRepository()
    workspaceRepository = new InMemoryWorkspacesRepository()
    projectCharterRepository = new InMemoryProjectChartersRepository()
    getProjectCharter = new GetProjectCharter(projectCharterRepository)
    usersRepository = new InMemoryUsersRepository()
    await usersRepository.create(user)
  })

  test('should be able to get a project charter', async () => {
    const workspace = WorkspaceFactory.create()
    const project = ProjectFactory.create({ workspaceId: workspace.id })
    const projectCharter = ProjectCharterFactory.create({
      projectId: project.id,
    })

    await workspaceRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    await projectRepository.create(project, user, InviteStatuses.ACTIVE, [
      ProjectRoles.ADMIN,
    ])

    await projectCharterRepository.create(projectCharter)

    const dbProjectCharter = await getProjectCharter.execute({
      projectCharterId: projectCharter.id,
    })
    expect(dbProjectCharter.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing project charter', async () => {
    const dbProjectCharter = await getProjectCharter.execute({
      projectCharterId: 'random-id',
    })
    expect(dbProjectCharter.isLeft()).toBeTruthy()
  })
})
