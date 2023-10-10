import { beforeAll, describe, expect, test } from 'vitest'
import { User } from '@/application/users/domain/user'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { IUserProjectsRepository } from '../../repositories/IUserProjectRepository'
import { IUserProjectRolesRepository } from '../../repositories/IUserProjectRolesRepository'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { CreateProject } from './create-project'
import { InMemoryProjectsRepository } from '../../repositories/in-memory/InMemoryProjectsRepository'
import { InMemoryUserProjectRolesRepository } from '../../repositories/in-memory/InMemoryUserProjectRolesRepository'
import { InMemoryUserProjectsRepository } from '../../repositories/in-memory/InMemoryUserProjectsRepository'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { InMemoryUserWorkspacesRepository } from '@/application/workspaces/repositories/in-memory/InMemoryUserWorkspacesRepository'
import { InMemoryUserWorkspaceRolesRepository } from '@/application/workspaces/repositories/in-memory/InMemoryUserWorkspaceRolesRepository'
import { InMemoryWorkspacesRepository } from '@/application/workspaces/repositories/in-memory/InMemoryWorkspacesRepository'
import { IUserWorkspacesRepository } from '@/application/workspaces/repositories/IUserWorkspaceRepository'
import { IUserWorkspaceRolesRepository } from '@/application/workspaces/repositories/IUserWorkspaceRolesRepository'
import { Workspace } from '@/application/workspaces/domain/workspace'
import PlanTypes from '@/application/workspaces/domain/plans.enum'
import PlanStatuses from '@/application/workspaces/domain/plan-statuses.enum'
import { UserWorkspace } from '@/application/workspaces/domain/user-workspace'
import InviteStatuses from '../../domain/invite-statuses.enum'
import { UserWorkspaceRole } from '@/application/workspaces/domain/user-workspace-role'
import Roles from '@/application/workspaces/domain/roles.schema'

let projectsRepository: IProjectsRepository
let userProjectsRepository: IUserProjectsRepository
let userProjectRolesRepository: IUserProjectRolesRepository

let workspacesRepository: IWorkspacesRepository
let userWorkspacesRepository: IUserWorkspacesRepository
let userWorkspaceRolesRepository: IUserWorkspaceRolesRepository

let usersRepository: IUsersRepository

let createProject: CreateProject

describe('Create a project', async () => {
  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()
    userProjectsRepository = new InMemoryUserProjectsRepository()
    userProjectRolesRepository = new InMemoryUserProjectRolesRepository()

    userWorkspacesRepository = new InMemoryUserWorkspacesRepository()
    userWorkspaceRolesRepository = new InMemoryUserWorkspaceRolesRepository()

    workspacesRepository = new InMemoryWorkspacesRepository(
      [],
      userWorkspacesRepository,
      userWorkspaceRolesRepository,
    )

    projectsRepository = new InMemoryProjectsRepository(
      [],
      userProjectsRepository,
      userProjectRolesRepository,
    )

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

  const userWorkspace = UserWorkspace.create({
    userId: user.id,
    workspaceId: workspace.id,
    status: InviteStatuses.ACTIVE,
  }).value as UserWorkspace

  const userWorkspaceRole = UserWorkspaceRole.create({
    userId: user.id,
    workspaceId: workspace.id,
    role: Roles.ADMIN,
  }).value as UserWorkspaceRole

  test('should create a project', async () => {
    await usersRepository.create(user)
    await workspacesRepository.create(
      workspace,
      userWorkspace,
      userWorkspaceRole,
    )

    const data = {
      name: 'workspace',
      description: 'My fucking workspace',
      workspaceId: workspace.id,
      currentUserId: user.id,
    }

    const response = await createProject.execute(data)

    expect(response.isRight()).toBeTruthy()
    console.log(response.value)

    expect(response.value).toBe('workspace')
  })
})
