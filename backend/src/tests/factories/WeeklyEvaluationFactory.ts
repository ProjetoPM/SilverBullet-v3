import { ProjectCharter } from '@/application/processes/integration/initiating/project-charter/domain/project-charter'
import { EvaluationStatuses } from '@/application/weekly-evaluation/domain/evaluation-statuses.enum'
import { Types } from '@/application/weekly-evaluation/domain/types.enum'
import { WeeklyEvaluation } from '@/application/weekly-evaluation/domain/weekly-evaluation'

type WeeklyEvaluationOverrides = {
    name?: string
    startDate?: Date
    endDate?: Date
    type?: Types
    status?: EvaluationStatuses
  workspaceId: string
}
export class WeeklyEvaluationFactory {
  static create(overrides: WeeklyEvaluationOverrides) {
    const weeklyEvaluation = WeeklyEvaluation.create({
      name: overrides.name || 'test-weeklyEvaluation',
      startDate: overrides.startDate || new Date(),
      endDate: overrides.endDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
      type: overrides.type || Types.INDIVIDUAL,
      status: overrides.status || EvaluationStatuses.OPEN,
      workspaceId: overrides.workspaceId,
    })

    return weeklyEvaluation.value as WeeklyEvaluation
  }
}
