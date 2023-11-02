import { t } from 'i18next'

export class ProjectCharterAlreadySignedError extends Error {
  constructor() {
    super(t('project_charter.already_signed'))
    this.name = 'ProjectCharterAlreadySignedError'
  }
}
