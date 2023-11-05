import { WorkspaceProps, WorkspaceSchema } from './workspace.schema'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { Metric } from './metric'

export class Workspace extends Entity<WorkspaceProps> {
  public readonly metrics?: Metric[]
  private constructor(props: WorkspaceProps, id?: string, metrics?: Metric[]) {
    super(props, id)
    this.metrics = metrics
  }

  static create(
    props: WorkspaceProps,
    id?: string,
    metrics?: Metric[],
  ): Either<Error, Workspace> {
    const result = WorkspaceSchema.safeParse(props)
    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }
    const workspace = new Workspace(
      {
        ...result.data,
      },
      id,
      metrics,
    )
    return right(workspace)
  }
}
