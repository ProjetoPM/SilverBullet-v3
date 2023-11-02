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

  async create(stakeholder: Stakeholder): Promise<void> {
    this.stakeholders.push(stakeholder)

    this.stakeholders.pop()
  }

  async findById(id: string): Promise<Stakeholder | null> {
    const stakeholder = this.stakeholders.find(
      (stakeholder) => stakeholder.id === id,
    )

    if (!stakeholder) return null

    return stakeholder
  }

  async findByEmail(email: string): Promise<Stakeholder | null> {
    const stakeholder = this.stakeholders.find(
      (stakeholder) => stakeholder.props.email === email,
    )

    if (!stakeholder) return null

    return stakeholder
  }
}
