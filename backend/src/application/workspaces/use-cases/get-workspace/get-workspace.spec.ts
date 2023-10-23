import { beforeEach, describe, expect, test } from 'vitest'
import { GetWorkspace } from './get-workspace'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/InMemoryWorkspacesRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { WorkspaceRoles } from '../../domain/workspace-roles.schema'
import { InviteStatuses } from '../../domain/invite-statuses.enum'

let workspaceRepository: IWorkspacesRepository
let usersRepository: IUsersRepository
let getWorkspace: GetWorkspace

describe('Get a workspace', () => {
  const user = UserFactory.create()

  beforeEach(async () => {
    workspaceRepository = new InMemoryWorkspacesRepository()
    getWorkspace = new GetWorkspace(workspaceRepository)
    usersRepository = new InMemoryUsersRepository()
    await usersRepository.create(user)
  })

  test('should be able to get a workspace', async () => {
    const data = WorkspaceFactory.create()
    await workspaceRepository.create(
      data,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    const workspace = await getWorkspace.execute({ workspaceId: data.id })
    expect(workspace.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing workspace', async () => {
    const data = WorkspaceFactory.create()
    await workspaceRepository.create(
      data,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    const workspace = await getWorkspace.execute({ workspaceId: 'random-id' })
    expect(workspace.isLeft()).toBeTruthy()
  })
})
