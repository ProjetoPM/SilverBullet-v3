import { Either, left, right } from '@/core/logic/either'
import { Stakeholder } from '../../domain/stakeholder'
import { IStakeholdersRepository } from '../../repositories/IStakeholdersRepository'
import { StakeholderDoesNotExistError } from './errors/StakeholderDoesNotExistError'
import Types from '../../domain/types.enum'
import ROLES from '../../domain/roles.enum'

type CreateStakeholderRequest = {
  type: Types
  mainProjectRole: ROLES
  email: string
  organization: string
  organizationPosition: string
  mainProjectResponsibility: string
  phone: string
  workplace: string
  essentialRequirements: string
  mainExpectations: string
  greaterInterestPhase: string
  observations: string
  projectId: string
  userId: string
}

// @TODO
// Verify null userId
type CreateStakeholderResponse = Either<
  StakeholderDoesNotExistError,
  Stakeholder
>

export class CreateStakeholder {
  constructor(private stakeholdersRepository: IStakeholdersRepository) {}

  async execute({
    type,
    mainProjectRole,
    email,
    organization,
    organizationPosition,
    mainProjectResponsibility,
    phone,
    workplace,
    essentialRequirements,
    mainExpectations,
    greaterInterestPhase,
    observations,
    projectId,
    userId,
  }: CreateStakeholderRequest): Promise<CreateStakeholderResponse> {

    const stakeholderOrError = Stakeholder.create({
      type,
      mainProjectRole,
      email,
      organization,
      organizationPosition,
      mainProjectResponsibility,
      phone,
      workplace,
      essentialRequirements,
      mainExpectations,
      greaterInterestPhase,
      observations,
      projectId,
      userId,
    })

    if (stakeholderOrError.isLeft()) {
      return left(stakeholderOrError.value)
    }

    const stakeholder = stakeholderOrError.value

    const stakeholderId = await this.stakeholdersRepository.create(stakeholder)

    if (!stakeholderId) {
      return left(new StakeholderDoesNotExistError())
    }

    return right(stakeholder)
  }
}
