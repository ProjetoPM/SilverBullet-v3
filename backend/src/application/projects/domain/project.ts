import { ProjectProps, ProjectSchema } from './project.schema'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'

export class Project extends Entity<ProjectProps> {
  private constructor(props: ProjectProps, id?: string) {
    super(props, id)
  }

  static create(props: ProjectProps, id?: string): Either<Error, Project> {
    const result = ProjectSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Project(result.data, id))
  }
}
