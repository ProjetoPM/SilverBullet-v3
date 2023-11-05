import { t } from 'i18next'

export class WorkspaceDoesNotExistError extends Error {
  constructor() {
    super(t('workspace.does_not_exist'))
    this.name = 'WorkspaceDoesNotExistError'
  }
}
