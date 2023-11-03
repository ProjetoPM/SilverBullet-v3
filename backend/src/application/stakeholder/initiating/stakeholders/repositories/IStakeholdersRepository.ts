import { Stakeholder } from '../domain/stakeholder'

export interface IStakeholdersRepository {
  create(project: Stakeholder): Promise<void>
  findByEmail(email: string): Promise<Stakeholder | null>
}
