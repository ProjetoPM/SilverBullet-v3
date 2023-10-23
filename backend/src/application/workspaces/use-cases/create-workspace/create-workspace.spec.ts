import { beforeAll, describe, expect, test } from 'vitest'

import { UserDoesNotExistError } from './errors/UserDoesNotExistError'

import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/InMemoryWorkspacesRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'

import { Workspace } from '../../domain/workspace'
import { User } from '@/application/users/domain/user'

import { CreateWorkspace } from './create-workspace'
import { UserFactory } from '@/tests/factories/UserFactory'

let workspacesRepository: IWorkspacesRepository
let usersRepository: IUsersRepository
let createWorkspace: CreateWorkspace

describe('Create a workspace', async () => {
  const user = UserFactory.create()

  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()
    await usersRepository.create(user)
    workspacesRepository = new InMemoryWorkspacesRepository()
    createWorkspace = new CreateWorkspace(workspacesRepository, usersRepository)
  })

  test('should create a workspace', async () => {
    const data = {
      name: 'workspace',
      description: 'A simple workspace',
      currentUserId: user.id,
    }

    const response = await createWorkspace.execute(data)
    expect(response.isRight()).toBeTruthy()
  })

  test('should create an workspace with no description', async () => {
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

  test('should not create a workspace with invalid user id', async () => {
    const data = {
      name: 'workspace',
      currentUserId: '1234invalic',
    }

    const response = await createWorkspace.execute(data)

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new UserDoesNotExistError())
  })

  test('should not create a workspace with workspace name too short', async () => {
    const data = {
      name: 'ww',
      currentUserId: user.id,
    }

    const response = await createWorkspace.execute(data)

    expect(response.isLeft()).toBeTruthy()
  })
})
