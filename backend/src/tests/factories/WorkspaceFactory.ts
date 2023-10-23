import { PlanStatuses } from '@/application/workspaces/domain/plan-statuses.enum'
import { PlanTypes } from '@/application/workspaces/domain/plan-types.enum'
import { Workspace } from '@/application/workspaces/domain/workspace'

type WorkspaceOverrides = {
  name?: string
  description?: string
}

export class WorkspaceFactory {
  static create(overrides?: WorkspaceOverrides) {
    const workspace = Workspace.create({
      name: overrides?.name || 'test-name',
      description: overrides?.description || 'test-description',
      plan: PlanTypes.FREE,
      planStatus: PlanStatuses.ACTIVE,
    })

    return workspace.value as Workspace
  }
}
