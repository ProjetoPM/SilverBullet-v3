import { t } from 'i18next'

export class UserDoesNotBelongToWorkspaceError extends Error {
  constructor() {
    super(t('user.DoesNotBelongToWorkspace'))
    this.name = 'UserDoesNotBelongToWorkspaceError'
  }
}
