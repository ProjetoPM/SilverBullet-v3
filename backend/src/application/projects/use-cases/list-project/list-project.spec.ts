import { beforeAll, describe, expect, test } from 'vitest'

import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'

import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { InMemoryWorkspacesRepository } from '@/application/workspaces/repositories/in-memory/InMemoryWorkspacesRepository'
import { ListWorkspace } from '@/application/workspaces/use-cases/list-workspace/list-workspace'
import { UserFactory } from '@/tests/factories/UserFactory'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { InviteStatuses } from '../../domain/invite-statuses.enum'

let workspacesRepository: IWorkspacesRepository
let usersRepository: IUsersRepository
let listWorkspace: ListWorkspace

describe('List a workspace', async () => {
  const user = UserFactory.create()
  const workspace = WorkspaceFactory.create()

  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()
    await usersRepository.create(user)
    workspacesRepository = new InMemoryWorkspacesRepository()
    listWorkspace = new ListWorkspace(workspacesRepository)
  })

  test('should get empty array when there is no workspace', async () => {
    const response = await listWorkspace.execute()
    expect(response.length).toBe(0)
  })

  test('should be able to list workspaces', async () => {
    await workspacesRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )
    await workspacesRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    const response = await listWorkspace.execute()
    expect(response.length === 2).toBeTruthy()
  })
})
