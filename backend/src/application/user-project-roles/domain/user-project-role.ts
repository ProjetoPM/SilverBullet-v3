import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { RelationshipEntity } from '@/core/domain/relationship-entity'
import {
  UserProjectRoleProps,
  UserProjectRoleSchema,
} from './user-project-role.schema'

export class UserProjectRole extends RelationshipEntity<UserProjectRoleProps> {
  private constructor(props: UserProjectRoleProps, id?: string) {
    super(props)
  }

  static create(props: UserProjectRoleProps): Either<Error, UserProjectRole> {
    const result = UserProjectRoleSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new UserProjectRole(result.data))
  }
}
