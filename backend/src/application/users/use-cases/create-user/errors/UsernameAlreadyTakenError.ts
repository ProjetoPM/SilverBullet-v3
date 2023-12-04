import { t } from 'i18next'

export class UsernameAlreadyTakenError extends Error {
  constructor() {
    super(t('users.username_taken'))
    this.name = 'UsernameAlreadyTakenError'
  }
}
