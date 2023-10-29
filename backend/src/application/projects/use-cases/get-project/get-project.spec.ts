import { beforeEach, describe, expect, test } from 'vitest'
import { GetProject } from './get-project'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { InMemoryProjectsRepository } from '../../repositories/in-memory/InMemoryProjectsRepository'
import { InMemoryWorkspacesRepository } from '@/application/workspaces/repositories/in-memory/InMemoryWorkspacesRepository'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { ProjectFactory } from '@/tests/factories/ProjectFactory'
import { ProjectRoles } from '../../domain/project-roles.schema'

let workspaceRepository: IWorkspacesRepository
let projectRepository: IProjectsRepository
let usersRepository: IUsersRepository
let getProject: GetProject

describe('Get a project', () => {
  const user = UserFactory.create()

  beforeEach(async () => {
    projectRepository = new InMemoryProjectsRepository()
    workspaceRepository = new InMemoryWorkspacesRepository()
    getProject = new GetProject(projectRepository)
    usersRepository = new InMemoryUsersRepository()
    await usersRepository.create(user)
  })

  test('should be able to get a project', async () => {
    const workspace = WorkspaceFactory.create()
    const project = ProjectFactory.create({ workspaceId: workspace.id })
    await workspaceRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    await projectRepository.create(project, user, InviteStatuses.ACTIVE, [
      ProjectRoles.ADMIN,
    ])

    const dbProject = await getProject.execute({ projectId: project.id })
    expect(dbProject.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing project', async () => {
    const dbProject = await getProject.execute({ projectId: 'random-id' })
    expect(dbProject.isLeft()).toBeTruthy()
  })
})
