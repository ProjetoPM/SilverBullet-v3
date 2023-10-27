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

import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { InMemoryWorkspacesRepository } from '@/application/workspaces/repositories/in-memory/InMemoryWorkspacesRepository'
import { Project } from '../../domain/project'
import { ProjectRoles } from '../../domain/project-roles.schema'
import { ProjectWithSameNameExistsError } from '../create-project/errors/ProjectWithSameNameExistsError'
import { EditProject } from './edit-project'

let usersRepository: IUsersRepository
let projectsRepository: IProjectsRepository
let workspacesRepository: IWorkspacesRepository

let editProject: EditProject

describe('Edit a project', async () => {
  let user: User
  let workspace: Workspace
  let project: Project
  let secondProject: Project

  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()

    workspacesRepository = new InMemoryWorkspacesRepository()

    projectsRepository = new InMemoryProjectsRepository()

    editProject = new EditProject(projectsRepository, usersRepository)
  })

  user = User.create({
    name: 'Thiago',
    email: 'tmelo387@gmail.com',
    password: 'bacon@123',
  }).value as User

  workspace = Workspace.create({
    name: 'My Workspace',
    plan: PlanTypes.FREE,
    planStatus: PlanStatuses.ACTIVE,
    description: 'SimpleWorkspace',
  }).value as Workspace

  project = Project.create({
    name: 'My Project',
    description: 'Simple Project',
    workspaceId: workspace.id,
  }).value as Project

  secondProject = Project.create({
    name: 'My other project',
    description: 'Simple Project',
    workspaceId: workspace.id,
  }).value as Project

  test('should edit a project', async () => {
    await usersRepository.create(user)
    await workspacesRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )
    await projectsRepository.create(project, user, InviteStatuses.ACTIVE, [
      ProjectRoles.ADMIN,
    ])

    const data = {
      name: 'new project name',
      description: 'A simple project',
      currentUserId: user.id,
      projectId: project.id,
    }

    const response = await editProject.execute(data)

    expect(response.isRight()).toBeTruthy()
  })

  test('should not update a project to an existing project name', async () => {
    await projectsRepository.create(
      secondProject,
      user,
      InviteStatuses.ACTIVE,
      [ProjectRoles.ADMIN],
    )

    const existingProject = Project.create({
      name: 'project',
      description: 'description',
      workspaceId: workspace.id,
    }).value as Project

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
      name: 'My other project',
      description: 'A simple project',
      projectId: project.id,
      currentUserId: user.id,
    }

    const response = await editProject.execute(data)

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new ProjectWithSameNameExistsError())
  })
})
