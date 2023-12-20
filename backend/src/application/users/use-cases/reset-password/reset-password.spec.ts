import { beforeAll, describe, expect, test } from 'vitest'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository'
import { UserFactory } from '../../../../tests/factories/UserFactory'
import { ResetPassword } from './reset-password'

let usersRepository: IUsersRepository
let resetPassword: ResetPassword

describe('Reset password', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    resetPassword = new ResetPassword(usersRepository)
  })

  test('should be able to reset password', async () => {
    const user = UserFactory.create()
    usersRepository.create(user)

    const response = await resetPassword.execute({
      userId: user.id,
      password: 'Bacon@1234',
      confirmPassword: 'Bacon@1234'
    })

    expect(response.isRight()).toBeTruthy()
  })

  test('should not be able to reset password with nonexistent user id', async () => {
    const response = await resetPassword.execute({
        userId: 'invalid-id',
        password: '123456',
        confirmPassword: '1234567'
    })

    expect(response.isLeft()).toBeTruthy()
  })
})
