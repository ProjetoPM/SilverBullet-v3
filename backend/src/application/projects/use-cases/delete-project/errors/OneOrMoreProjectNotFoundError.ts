import { t } from 'i18next'

export class OneOrMoreProjectNotFoundError extends Error {
  constructor() {
    super(t('project.one_or_more_not_found'))
    this.name = 'OneOrMoreProjectNotFoundError'
  }
}
