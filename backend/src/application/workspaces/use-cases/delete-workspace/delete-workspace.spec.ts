import { beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { DeleteWorkspace } from './delete-workspace'
import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/InMemoryWorkspacesRepository'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { WorkspaceRoles } from '../../domain/workspace-roles.schema'

let workspaceRepository: IWorkspacesRepository
let usersRepository: IUsersRepository
let deleteCategory: DeleteWorkspace

describe('Delete workspace', () => {
  const user = UserFactory.create()

  beforeAll(async () => {
    workspaceRepository = new InMemoryWorkspacesRepository()
    usersRepository = new InMemoryUsersRepository()
    deleteCategory = new DeleteWorkspace(workspaceRepository)
    await usersRepository.create(user)
  })

  test('should delete a workspace', async () => {
    const category1 = WorkspaceFactory.create()

    await workspaceRepository.create(
      category1,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    const response = await deleteCategory.execute({
      ids: [category1.id],
    })

    expect(response.isRight()).toBeTruthy()
    expect(await workspaceRepository.list()).toStrictEqual([])
  })

  test('should delete workspaces', async () => {
    const category1 = WorkspaceFactory.create()
    const category2 = WorkspaceFactory.create()

    await workspaceRepository.create(
      category1,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )
    await workspaceRepository.create(
      category2,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    const response = await deleteCategory.execute({
      ids: [category1.id, category2.id],
    })

    expect(response.isRight()).toBeTruthy()
    expect(await workspaceRepository.list()).toStrictEqual([])
  })

  test('should not delete a non-existing category', async () => {
    const category1 = WorkspaceFactory.create()
    await workspaceRepository.create(
      category1,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    const response = await deleteCategory.execute({
      ids: [category1.id, 'non-existing-id'],
    })

    expect(response.isLeft()).toBeTruthy()
    expect(await workspaceRepository.list()).toStrictEqual([category1])
  })
})
