import { User as PersistenceUser } from '@prisma/client'
import { User } from '../domain/user'
import { t } from 'i18next'
import { Password } from '@/core/domain/password'

export class UserMapper {
  static toDomain(raw: PersistenceUser) {
    const userOrError = User.create(
      {
        name: raw.name,
        username: raw.username,
        email: raw.email,
        password: raw.password,
        emailVerified: raw.email_verified
      },
      raw.id,
    )

    if (userOrError.isLeft()) {
      throw new Error(t('errors.invalid_user'))
    }

    return userOrError.value
  }

  static async toPersistence(user: User) {
    const hashed = Password.create(user.props.password, true)

    if (hashed.isLeft()) {
      throw new Error(t('errors.invalid_hash_password'))
    }

    return {
      id: user.id,
      name: user.props.name,
      username: user.props.username,
      email: user.props.email,
      password: await hashed.value.getHashedValue(),
      phone: user.props.phone,
      email_verified: user.props.emailVerified,
    }
  }
}
