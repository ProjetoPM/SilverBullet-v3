import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { MetricProps, MetricSchema } from './metric.schema'

export class Metric extends Entity<MetricProps> {
  private constructor(props: MetricProps, id?: string) {
    super(props, id)
  }

  static create(props: MetricProps, id?: string): Either<Error, Metric> {
    const result = MetricSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Metric(result.data, id))
  }
}
