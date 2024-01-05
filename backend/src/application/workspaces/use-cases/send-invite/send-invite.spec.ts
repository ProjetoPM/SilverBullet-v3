import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { SendInvite } from './send-invite'
import { UserFactory } from '@/tests/factories/UserFactory'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/InMemoryWorkspacesRepository'
import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { WorkspaceRoles } from '../../domain/workspace-roles.schema'

let workspacesRepository: IWorkspacesRepository
let usersRepository: IUsersRepository
let sendInvite: SendInvite

describe('Send invite', async () => {
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
    sendInvite = new SendInvite(usersRepository, workspacesRepository)
  })

  test('should send an invite', async () => {
    const req = {
      userId: user.id,
      workspaceId: workspace.id,
      data: [
        {
          email: 'teste1@gmail.com',
          role: WorkspaceRoles.USER,
        },
      ],
    }
    const response = await sendInvite.execute(req)
    expect(response.isRight).toBeTruthy()
  })
})
