import { t } from 'i18next'

export class ProjectNotCreatedError extends Error {
  constructor() {
    super(t('project.notCreated'))
    this.name = 'ProjectNotCreated'
  }
}
