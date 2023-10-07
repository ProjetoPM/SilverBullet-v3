import { t } from 'i18next'

export class WorkspaceNotCreatedError extends Error {
  constructor() {
    super(t('workspace.notCreated'))
    this.name = 'WorkspaceNotCreated'
  }
}
