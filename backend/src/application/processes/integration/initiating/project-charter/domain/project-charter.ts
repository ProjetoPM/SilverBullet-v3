import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import {
  ProjectCharterProps,
  ProjectCharterSchema,
} from './project-charter.schema'

export class ProjectCharter extends Entity<ProjectCharterProps> {
  private constructor(props: ProjectCharterProps, id?: string) {
    super(props, id)
  }

  static create(
    props: ProjectCharterProps,
    id?: string,
  ): Either<Error, ProjectCharter> {
    const result = ProjectCharterSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new ProjectCharter(result.data, id))
  }
}
