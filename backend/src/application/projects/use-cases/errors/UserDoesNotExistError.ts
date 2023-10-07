import { t } from 'i18next'

export class UserDoesNotExistError extends Error {
  constructor() {
    super(t('user.doesNotExist'))
    this.name = 'UserDoesNotExistError'
  }
}
