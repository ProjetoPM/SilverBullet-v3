import { t } from 'i18next'

export class UserDoesNotBelongToWorkspaceError extends Error {
  constructor() {
    super(t('user.does_not_belong_to_workspace'))
    this.name = 'UserDoesNotBelongToWorkspaceError'
  }
}
