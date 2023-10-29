import { beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { DeleteProject } from './delete-project'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { InMemoryWorkspacesRepository } from '@/application/workspaces/repositories/in-memory/InMemoryWorkspacesRepository'
import { InMemoryProjectsRepository } from '../../repositories/in-memory/InMemoryProjectsRepository'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { ProjectFactory } from '@/tests/factories/ProjectFactory'
import { ProjectRoles } from '../../domain/project-roles.schema'

let workspaceRepository: IWorkspacesRepository
let projectRepository: IProjectsRepository
let usersRepository: IUsersRepository
let deleteProject: DeleteProject

describe('Delete workspace', () => {
  const user = UserFactory.create()

  beforeAll(async () => {
    workspaceRepository = new InMemoryWorkspacesRepository()
    projectRepository = new InMemoryProjectsRepository()
    usersRepository = new InMemoryUsersRepository()
    deleteProject = new DeleteProject(projectRepository)
    await usersRepository.create(user)
  })

  test('should delete a project', async () => {
    const workspace = WorkspaceFactory.create()
    const project = ProjectFactory.create({
      workspaceId: workspace.id,
      name: 'Project 1',
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

    const response = await deleteProject.execute({
      ids: [project.id],
    })

    expect(response.isRight()).toBeTruthy()
    expect(await workspaceRepository.list()).toStrictEqual([])
  })

  test('should delete workspaces', async () => {
    const workspace = WorkspaceFactory.create()
    const project1 = ProjectFactory.create({
      workspaceId: workspace.id,
      name: 'Project 1',
    })

    const project2 = ProjectFactory.create({
      workspaceId: workspace.id,
      name: 'Project 1',
    })

    await workspaceRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    await projectRepository.create(project1, user, InviteStatuses.ACTIVE, [
      ProjectRoles.ADMIN,
    ])
    await projectRepository.create(project2, user, InviteStatuses.ACTIVE, [
      ProjectRoles.ADMIN,
    ])

    const response = await deleteProject.execute({
      ids: [project1.id, project2.id],
    })

    expect(response.isRight()).toBeTruthy()
    expect(
      await projectRepository.listUserProjectsByWorkspaceId(
        workspace.id,
        user.id,
      ),
    ).toStrictEqual([])
  })

  test('should not delete a non-existing project', async () => {
    const workspace = WorkspaceFactory.create()
    const project = ProjectFactory.create({
      workspaceId: workspace.id,
      name: 'Project 1',
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

    const response = await deleteProject.execute({
      ids: [project.id, 'non-existing-id'],
    })

    expect(response.isLeft()).toBeTruthy()
    expect(
      await projectRepository.listUserProjectsByWorkspaceId(
        workspace.id,
        user.id,
      ),
    ).toStrictEqual([project])
  })
})
