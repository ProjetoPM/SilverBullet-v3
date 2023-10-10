export interface IUserWorkspacesRepository {
  verifyActiveWorkspace(userId: string, workspaceId: string): Promise<boolean>
}
