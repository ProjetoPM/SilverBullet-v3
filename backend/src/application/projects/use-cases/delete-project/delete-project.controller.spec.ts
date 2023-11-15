import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { app } from '@/infra/http/app'
import { UserFactory } from '@/tests/factories/UserFactory'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { beforeAll, describe, expect, test } from 'vitest'
import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { PrismaProjectsRepository } from '../../repositories/prisma/PrismaProjectsRepository'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { ProjectFactory } from '@/tests/factories/ProjectFactory'
import { ProjectRoles } from '../../domain/project-roles.schema'

let usersRepository: IUsersRepository
let workspaceRepository: IWorkspacesRepository
let projectRepository: IProjectsRepository

describe('Delete project (end-to-end)', async () => {
  beforeAll(async () => {
    workspaceRepository = new PrismaWorkspacesRepository()
    projectRepository = new PrismaProjectsRepository()
    usersRepository = new PrismaUsersRepository()
  })

  test('should be able to delete an existing project', async () => {
    const { jwt, user } = UserFactory.createAndAuthenticate()

    const workspace = WorkspaceFactory.create()
    const project = ProjectFactory.create({ workspaceId: workspace.id })

    await usersRepository.create(user)
    await workspaceRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    await projectRepository.create(project, user, InviteStatuses.ACTIVE, [
      ProjectRoles.ADMIN,
    ])

    const response = await request(app)
      .del(`/api/projects/?ids=${project.id}`)
      .set({ 'current-workspace-id': workspace.id })
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should be able to delete more than one project', async () => {
    const { jwt, user } = UserFactory.createAndAuthenticate()

    await usersRepository.create(user)

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

    const response = await request(app)
      .del(`/api/projects/?ids=${project1.id}&ids=${project2.id}`)
      .set({ 'current-workspace-id': workspace.id })
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
  })

  test("should not be able to delete a project that doesn't exist", async () => {
    const { jwt, user } = UserFactory.createAndAuthenticate()
    await usersRepository.create(user)

    const workspace = WorkspaceFactory.create()
    await workspaceRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    const response = await request(app)
      .del(`/api/projects/?ids=invalid-id`)
      .set({ 'current-workspace-id': workspace.id })
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
