import { t } from 'i18next'

export class ProjectCharterDoesNotExistError extends Error {
  constructor() {
    super(t('project_charter.does_not_exist'))
    this.name = 'ProjectCharterDoesNotExistError'
  }
}
