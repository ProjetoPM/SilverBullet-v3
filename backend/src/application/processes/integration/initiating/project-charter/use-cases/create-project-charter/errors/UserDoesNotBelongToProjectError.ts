import { t } from 'i18next'

export class UserDoesNotBelongToProjectError extends Error {
  constructor() {
    super(t('user.does_not_belong_to_project'))
    this.name = 'UserDoesNotBelongToProjectError'
  }
}
