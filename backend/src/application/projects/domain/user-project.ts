import { UserProjectProps, UserProjectSchema } from './user-project.schema'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { RelationshipEntity } from '@/core/domain/relationship-entity'

export class UserProject extends RelationshipEntity<UserProjectProps> {
  private constructor(props: UserProjectProps) {
    super(props)
  }

  static create(
    props: UserProjectProps,
    id?: string,
  ): Either<Error, UserProject> {
    const result = UserProjectSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new UserProject(result.data))
  }
}
