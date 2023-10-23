import { User } from '@/application/users/domain/user'
import { JWT } from '@/core/domain/jwt'

type UserOverrides = {
  email?: string
  password?: string
}

export class UserFactory {
  static create(overrides?: UserOverrides) {
    const email = `test-${Math.random()}-${Math.random()}@test.com`

    const user = User.create({
      name: 'test',
      email: overrides?.email || email,
      password: overrides?.password || '12345678',
    })

    return user.value as User
  }

  static createAndAuthenticate(overrides?: UserOverrides) {
    const user = UserFactory.create(overrides)
    const jwt = JWT.signUser(user)

    return {
      user,
      jwt,
    }
  }
}
