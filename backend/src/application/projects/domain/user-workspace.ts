import {
  UserWorkspaceProps,
  UserWorkspaceSchema,
} from './user-workspace.schema'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { RelationshipEntity } from '@/core/domain/relationship-entity'

export class UserWorkspace extends RelationshipEntity<UserWorkspaceProps> {
  private constructor(props: UserWorkspaceProps) {
    super(props)
  }

  static create(props: UserWorkspaceProps): Either<Error, UserWorkspace> {
    const result = UserWorkspaceSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new UserWorkspace(result.data))
  }
}
