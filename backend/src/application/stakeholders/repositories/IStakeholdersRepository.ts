import { Stakeholder } from '../domain/stakeholder'

export interface IStakeholdersRepository {
  create(project: Stakeholder): Promise<string | null>
  findById(id: string): Promise<Stakeholder | null>
}
