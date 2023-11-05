import { t } from 'i18next'

export class StartDateGreaterThanEndDateError extends Error {
  constructor() {
    super(t('date.start_greater_than_end'))
    this.name = 'StartDateGreaterThanEndDateError'
  }
}
