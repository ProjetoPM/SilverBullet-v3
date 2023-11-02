import { t } from 'i18next'

export class StakeholderDoesNotExistError extends Error {
  constructor() {
    super(t('stakeholder.doesNotExist'))
    this.name = 'StakeholderDoesNotExist'
  }
}
