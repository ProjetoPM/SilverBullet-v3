import { t } from 'i18next'

export class WeeklyEvaluationNotCreatedError extends Error {
  constructor() {
    super(t('weekly_evaluation.not_created'))
    this.name = 'WeeklyEvaluationNotCreatedError'
  }
}
