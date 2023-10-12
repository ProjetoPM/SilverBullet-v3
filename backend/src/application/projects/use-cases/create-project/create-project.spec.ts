import { beforeAll, describe, expect, test } from 'vitest'
import { User } from '@/application/users/domain/user'

import { Workspace } from '@/application/workspaces/domain/workspace'
import { PlanTypes } from '@/application/workspaces/domain/plan-types.enum'
import { PlanStatuses } from '@/application/workspaces/domain/plan-statuses.enum'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'

import { InviteStatuses } from '../../domain/invite-statuses.enum'

import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { InMemoryProjectsRepository } from '../../repositories/in-memory/InMemoryProjectsRepository'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/InMemoryWorkspacesRepository'

import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'

import { CreateProject } from './create-project'

let usersRepository: IUsersRepository
let projectsRepository: IProjectsRepository
let workspacesRepository: IWorkspacesRepository

let createProject: CreateProject

describe('Create a project', async () => {
  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()

    workspacesRepository = new InMemoryWorkspacesRepository()

    projectsRepository = new InMemoryProjectsRepository()

    createProject = new CreateProject(
      projectsRepository,
      usersRepository,
      workspacesRepository,
    )
  })

  const user = User.create({
    name: 'Thiago',
    email: 'tmelo387@gmail.com',
    password: 'bacon@123',
  }).value as User

  const workspace = Workspace.create({
    name: 'My Workspace',
    plan: PlanTypes.FREE,
    planStatus: PlanStatuses.ACTIVE,
    description: 'SimpleWorkspace',
  }).value as Workspace

  const userWorkspace = {
    userId: user.id,
    workspaceId: workspace.id,
    status: InviteStatuses.ACTIVE,
  }

  test('should create a project', async () => {
    await usersRepository.create(user)

    const data = {
      name: 'project',
      description: 'A simple project',
      workspaceId: workspace.id,
      currentUserId: user.id,
    }

    const response = await createProject.execute(data)

    expect(response.isRight()).toBeTruthy()
  })
})
