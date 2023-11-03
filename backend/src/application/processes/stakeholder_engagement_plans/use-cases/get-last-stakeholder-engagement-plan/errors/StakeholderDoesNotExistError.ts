import { t } from 'i18next'

export class StakeholderDoesNotExistError extends Error {
  constructor() {
    super(t('stakeholder.does_not_exist'))
    this.name = 'StakeholderDoesNotExistError'
  }
}
