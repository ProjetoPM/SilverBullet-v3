import { t } from 'i18next'

export class WorkspaceNotFoundError extends Error {
  constructor() {
    super(t('workspace.not_found'))
    this.name = 'WorkspaceNotFoundError'
  }
}
