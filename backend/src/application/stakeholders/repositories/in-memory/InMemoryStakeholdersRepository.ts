import { Stakeholder } from '../../domain/stakeholder'
import { IStakeholdersRepository } from '../IStakeholdersRepository'

export class InMemoryStakeholdersRepository implements IStakeholdersRepository {
  constructor(public stakeholders: Stakeholder[] = []) {}

  async save(stakeholder: Stakeholder): Promise<void> {
    const stakeholderIndex = this.stakeholders.findIndex(
      (stakeholder) => stakeholder.id === stakeholder.id,
    )
    this.stakeholders[stakeholderIndex] = stakeholder
  }

  async create(stakeholder: Stakeholder): Promise<string | null> {
    this.stakeholders.push(stakeholder)

    const dbStakeholder = this.stakeholders.pop()

    if (!dbStakeholder) return null

    return dbStakeholder.id
  }

  async findById(id: string): Promise<Stakeholder | null> {
    const stakeholder = this.stakeholders.find(
      (stakeholder) => stakeholder.id === id,
    )

    if (!stakeholder) return null

    return stakeholder
  }
}
