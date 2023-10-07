import { Workspace as PersistenceWorkspace } from '@prisma/client'
import { Workspace } from '../domain/workspace'
import { t } from 'i18next'
import PlanType from '../domain/plans.enum'
import PlanStatus from '../domain/plan-statuses.enum'

export class WorkspaceMapper {
  static toDomain(raw: PersistenceWorkspace) {
    const workspaceOrError = Workspace.create(
      {
        name: raw.name,
        description: raw.description,
        plan: raw.plan as unknown as PlanType,
        planStatus: raw.plan_status as unknown as PlanStatus,
      },
      raw.id,
    )

    if (workspaceOrError.isLeft()) {
      throw new Error(t('errors.invalid_workspace'))
    }

    if (workspaceOrError.isRight()) {
      return workspaceOrError.value
    }
    return null
  }

  static async toPersistence(workspace: Workspace) {
    return {
      id: workspace.id,
      name: workspace.props.name,
      description: workspace.props.description,
      plan: workspace.props.plan,
      plan_status: workspace.props.planStatus,
    }
  }
}
