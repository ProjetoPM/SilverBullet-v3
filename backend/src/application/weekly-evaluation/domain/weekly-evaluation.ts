import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import {
  WeeklyEvaluationProps,
  WeeklyEvaluationSchema,
} from './weekly-evaluation.schema'

export class WeeklyEvaluation extends Entity<WeeklyEvaluationProps> {
  private constructor(props: WeeklyEvaluationProps, id?: string) {
    super(props, id)
  }

  static create(
    props: WeeklyEvaluationProps,
    id?: string,
  ): Either<Error, WeeklyEvaluation> {
    const result = WeeklyEvaluationSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new WeeklyEvaluation(result.data, id))
  }
}
