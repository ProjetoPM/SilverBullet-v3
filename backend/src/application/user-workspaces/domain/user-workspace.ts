import {
  UserWorkspaceProps,
  UserWorkspaceSchema,
} from './user-workspace.schema'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { Entity } from '@/core/domain/entity'

export class UserWorkspace extends Entity<UserWorkspaceProps> {
  private constructor(props: UserWorkspaceProps, id?: string) {
    super(props)
  }

  static create(
    props: UserWorkspaceProps,
    id?: string,
  ): Either<Error, UserWorkspace> {
    const result = UserWorkspaceSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new UserWorkspace(result.data, id))
  }
}
