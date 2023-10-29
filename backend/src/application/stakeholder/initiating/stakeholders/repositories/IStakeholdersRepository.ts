import { Stakeholder } from '../domain/stakeholder'

export interface IStakeholdersRepository {
  create(project: Stakeholder): Promise<string | null>
  findByEmail(email: string): Promise<Stakeholder | null>
}
