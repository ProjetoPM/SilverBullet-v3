import { t } from 'i18next'

export class WorkspaceDoesNotExistError extends Error {
  constructor() {
    super(t('workspace.doesNotExist'))
    this.name = 'WorkspaceDoesNotExistError'
  }
}
