import { Workspace as PersistenceWorkspace } from '@prisma/client'
import { Workspace } from '../domain/workspace'
import { t } from 'i18next'
import { PlanTypes } from '../domain/plan-types.enum'
import { PlanStatuses } from '../domain/plan-statuses.enum'
import { MetricMapper } from './metric-mapper'

export class WorkspaceMapper {
  static toDomain(raw: PersistenceWorkspace) {
    const workspaceOrError = Workspace.create(
      {
        name: raw.name,
        description: raw.description,
        plan: raw.plan as PlanTypes,
        planStatus: raw.plan_status as PlanStatuses,
      },
      raw.id,
    
    )

    if (workspaceOrError.isLeft()) {
      throw new Error(t('errors.invalid_workspace'))
    }

    return workspaceOrError.value
  }

  static async toPersistence(workspace: Workspace) {
    return {
      id: workspace.id,
      name: workspace.props.name,
      description: workspace.props.description,
      plan: workspace.props.plan,
      plan_status: workspace.props.planStatus,
      metrics: workspace.metrics
        ? await Promise.all(
            workspace.metrics.map(async (metric) =>
              MetricMapper.toPersistence(metric),
            ),
          )
        : [],
    }
  }
}
