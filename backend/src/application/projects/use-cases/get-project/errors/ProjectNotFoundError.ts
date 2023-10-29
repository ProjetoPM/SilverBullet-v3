import { t } from 'i18next'

export class ProjectNotFoundError extends Error {
  constructor() {
    super(t('project.not_found'))
    this.name = 'ProjectNotFoundError'
  }
}
