import {
  Workspace as PersistenceWorkspace,
  UserWorkspace as PersistenceUserWorkspace,
} from '@prisma/client'
import { Workspace } from '../domain/workspace'
import { t } from 'i18next'
import { PlanTypes } from '../domain/plan-types.enum'
import { PlanStatuses } from '../domain/plan-statuses.enum'
import { MetricMapper } from './metric-mapper'
import { UserWorkspace } from '../domain/user-workspace.type'

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

  static toDomainUserWorkspace(raw: PersistenceUserWorkspace): UserWorkspace {
    return {
      userId: raw.user_id,
      workspaceId: raw.workspace_id,
      email: raw.email,
      status: raw.status,
      role: raw.role,
    }
  }
}
