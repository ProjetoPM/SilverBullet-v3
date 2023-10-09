import { beforeAll, describe, expect, test } from 'vitest'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/InMemoryWorkspacesRepository'
import { CreateWorkspace } from './create-workspace'
import { Workspace } from '../../domain/workspace'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { UserDoesNotExistError } from '../errors/UserDoesNotExistError'
import { User } from '@/application/users/domain/user'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { InMemoryUserWorkspacesRepository } from '../../repositories/in-memory/InMemoryUserWorkspacesRepository'
import { IUserWorkspacesRepository } from '../../repositories/IUserWorkspaceRepository'
import { IUserWorkspaceRolesRepository } from '../../repositories/IUserWorkspaceRolesRepository'
import { InMemoryUserWorkspaceRolesRepository } from '../../repositories/in-memory/InMemoryUserWorkspaceRolesRepository'

let workspacesRepository: IWorkspacesRepository
let userWorkspacesRepository: IUserWorkspacesRepository
let userWorkspaceRolesRepository: IUserWorkspaceRolesRepository

let usersRepository: IUsersRepository

let createWorkspace: CreateWorkspace

describe('Create a workspace', async () => {
  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()
    userWorkspacesRepository = new InMemoryUserWorkspacesRepository()
    userWorkspaceRolesRepository = new InMemoryUserWorkspaceRolesRepository()

    workspacesRepository = new InMemoryWorkspacesRepository(
      [],
      userWorkspacesRepository,
      userWorkspaceRolesRepository,
    )

    createWorkspace = new CreateWorkspace(workspacesRepository, usersRepository)
  })

  const user = User.create({
    name: 'Thiago',
    email: 'tmelo387@gmail.com',
    password: 'bacon@123',
  }).value as User

  test('should create a workspace', async () => {
    await usersRepository.create(user)

    const data = {
      name: 'workspace',
      description: 'My fucking workspace',
      currentUserId: user.id,
    }

    const response = await createWorkspace.execute(data)

    expect(response.isRight()).toBeTruthy()
  })

  test('should create an workspace with no description', async () => {
    await usersRepository.create(user)

    const data = {
      name: 'workspace',
      currentUserId: user.id,
    }

    const response = await createWorkspace.execute(data)

    expect(response.isRight()).toBeTruthy()

    const workspaceSaved = response.value as Workspace
    expect(workspaceSaved.props.name).toBe(data.name)
    expect(workspaceSaved.props.description).toBe(undefined)
  })

  test('invalid user id', async () => {
    const data = {
      name: 'workspace',
      currentUserId: '1234invalic',
    }

    const response = await createWorkspace.execute(data)

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new UserDoesNotExistError())
  })
})
