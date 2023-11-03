import { t } from 'i18next'

export class ProjectCharterNotFoundError extends Error {
  constructor() {
    super(t('project_charter.not_found'))
    this.name = 'ProjectCharterNotFoundError'
  }
}
