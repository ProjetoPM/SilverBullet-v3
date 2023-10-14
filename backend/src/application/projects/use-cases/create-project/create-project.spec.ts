import { beforeAll, describe, expect, test } from 'vitest'
import { User } from '@/application/users/domain/user'

import { Workspace } from '@/application/workspaces/domain/workspace'
import { PlanTypes } from '@/application/workspaces/domain/plan-types.enum'
import { PlanStatuses } from '@/application/workspaces/domain/plan-statuses.enum'

import { InviteStatuses } from '../../domain/invite-statuses.enum'

import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { InMemoryProjectsRepository } from '../../repositories/in-memory/InMemoryProjectsRepository'

import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'

import { CreateProject } from './create-project'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { InMemoryWorkspacesRepository } from '@/application/workspaces/repositories/in-memory/InMemoryWorkspacesRepository'
import { Project } from '../../domain/project'
import { ProjectRoles } from '../../domain/project-roles.schema'
import { ProjectWithSameNameExistsError } from '../errors/ProjectWithSameNameExistsError'

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

  test('should create a project', async () => {
    await usersRepository.create(user)
    await workspacesRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    const data = {
      name: 'project',
      description: 'A simple project',
      workspaceId: workspace.id,
      currentUserId: user.id,
    }

    const response = await createProject.execute(data)

    expect(response.isRight()).toBeTruthy()
  })

  test('should not create a project with same name', async () => {
    const existingProject = (await Project.create({
      name: 'project',
      description: 'description',
      workspaceId: workspace.id,
    }).value) as Project

    await projectsRepository.create(
      existingProject,
      user,
      InviteStatuses.ACTIVE,
      [ProjectRoles.ADMIN],
    )
    await usersRepository.create(user)
    await workspacesRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    const data = {
      name: 'project',
      description: 'A simple project',
      workspaceId: workspace.id,
      currentUserId: user.id,
    }

    const response = await createProject.execute(data)

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new ProjectWithSameNameExistsError())
  })
})
