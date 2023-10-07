import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { RelationshipEntity } from '@/core/domain/relationship-entity'
import {
  UserWorkspaceRoleProps,
  UserWorkspaceRoleSchema,
} from './user-workspace-role.schema'

export class UserWorkspaceRole extends RelationshipEntity<UserWorkspaceRoleProps> {
  private constructor(props: UserWorkspaceRoleProps) {
    super(props)
  }

  static create(
    props: UserWorkspaceRoleProps,
  ): Either<Error, UserWorkspaceRole> {
    const result = UserWorkspaceRoleSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new UserWorkspaceRole(result.data))
  }
}
