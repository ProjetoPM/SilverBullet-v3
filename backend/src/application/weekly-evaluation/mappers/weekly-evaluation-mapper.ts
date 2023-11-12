import { WeeklyEvaluation as PersistenceWeeklyEvaluation } from '@prisma/client'
import { WeeklyEvaluation } from '../domain/weekly-evaluation'
import { t } from 'i18next'
import { EvaluationStatuses } from '../domain/evaluation-statuses.enum'
import { Types } from '../domain/types.enum'

export class WeeklyEvaluationMapper {
  static toDomain(raw: PersistenceWeeklyEvaluation) {
    const projectOrError = WeeklyEvaluation.create(
      {
        name: raw.name,
        startDate: raw.start_date,
        endDate: raw.end_date,
        status: raw.status as EvaluationStatuses,
        type: raw.type as Types,
        workspaceId: raw.workspace_id,
      },
      raw.id,
    )

    if (projectOrError.isLeft()) {
      throw new Error(t('errors.invalid_project'))
    }

    return projectOrError.value
  }

  static async toPersistence(weeklyEvaluation: WeeklyEvaluation) {
    return {
      id: weeklyEvaluation.id,
      name: weeklyEvaluation.props.name,
      start_date: weeklyEvaluation.props.startDate,
      end_date: weeklyEvaluation.props.endDate,
      type: weeklyEvaluation.props.type,
      status: weeklyEvaluation.props.status,
      workspace_id: weeklyEvaluation.props.workspaceId,
    }
  }
}
