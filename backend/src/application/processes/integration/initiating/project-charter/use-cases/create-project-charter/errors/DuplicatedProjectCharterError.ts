import { t } from 'i18next'

export class DuplicatedProjectCharterError extends Error {
  constructor() {
    super(t('project_charter.duplicated'))
    this.name = 'DuplicatedProjectCharterError'
  }
}
