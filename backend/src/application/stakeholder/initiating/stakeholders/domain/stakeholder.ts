import { StakeholderProps, StakeholderSchema } from './stakeholder.schema'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'

export class Stakeholder extends Entity<StakeholderProps> {
  private constructor(props: StakeholderProps, id?: string) {
    super(props, id)
  }

  static create(
    props: StakeholderProps,
    id?: string,
  ): Either<Error, Stakeholder> {
    const result = StakeholderSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Stakeholder(result.data, id))
  }
}
