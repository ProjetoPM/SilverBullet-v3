import { t } from 'i18next'

export class ProjectCharterNotCreatedError extends Error {
  constructor() {
    super(t('project_charter.not_created'))
    this.name = 'ProjectCharterNotCreatedError'
  }
}
