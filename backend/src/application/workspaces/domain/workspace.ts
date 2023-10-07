import { WorkspaceProps, WorkspaceSchema } from './workspace.schema'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'

export class Workspace extends Entity<WorkspaceProps> {
  private constructor(props: WorkspaceProps, id?: string) {
    super(props, id)
  }

  static create(props: WorkspaceProps, id?: string): Either<Error, Workspace> {
    const result = WorkspaceSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Workspace(result.data, id))
  }
}
