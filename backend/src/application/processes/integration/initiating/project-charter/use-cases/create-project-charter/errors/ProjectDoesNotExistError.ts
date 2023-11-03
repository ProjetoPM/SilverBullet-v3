import { t } from 'i18next'

export class ProjectDoesNotExistError extends Error {
  constructor() {
    super(t('project.does_not_exist'))
    this.name = 'ProjectDoesNotExistError'
  }
}
