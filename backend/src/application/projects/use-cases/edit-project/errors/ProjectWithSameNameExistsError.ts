import { t } from 'i18next'

export class ProjectWithSameNameExistsError extends Error {
  constructor() {
    super(t('project.with_same_name_exists'))
    this.name = 'ProjectWithSameNameExistsError'
  }
}
