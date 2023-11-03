import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { beforeAll, describe, expect, test } from 'vitest'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/InMemoryWorkspacesRepository'

import { Workspace } from '../../domain/workspace'

import { UserFactory } from '@/tests/factories/UserFactory'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { WorkspaceRoles } from '../../domain/workspace-roles.schema'
import { EditWorkspace } from './edit-workspace'

let workspacesRepository: IWorkspacesRepository
let usersRepository: IUsersRepository
let editWorkspace: EditWorkspace

describe('Edit a workspace', async () => {
  const user = UserFactory.create()
  const workspace = WorkspaceFactory.create()

  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()
    await usersRepository.create(user)
    workspacesRepository = new InMemoryWorkspacesRepository()
    await workspacesRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )
    editWorkspace = new EditWorkspace(workspacesRepository, usersRepository)
  })

  test('should edit a workspace', async () => {
    const data = {
      workspaceId: workspace.id,
      name: 'workspace',
      description: 'a simple workspace',
      currentUserId: user.id,
    }

    const response = await editWorkspace.execute(data)
    expect(response.isRight()).toBeTruthy()

    const workspaceSaved = response.value as Workspace
    expect(workspaceSaved.props.name).toBe(data.name)
    expect(workspaceSaved.props.description).toBe(data.description)
  })

  test('should not be able to edit a workspace without a name', async () => {
    const data = {
      workspaceId: workspace.id,
      name: '',
      description: 'a simple workspace',
      currentUserId: user.id,
    }

    const response = await editWorkspace.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
