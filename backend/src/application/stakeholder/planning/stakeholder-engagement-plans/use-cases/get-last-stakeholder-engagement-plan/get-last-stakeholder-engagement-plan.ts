// import { Either, left, right } from '@/core/logic/either'
// import { StakeholderEngagementPlan } from '../../domain/stakeholder-engagement-plan'
// import { IStakeholderEngagementPlansRepository } from '../../repositories/IStakeholderEngagementPlansRepository'
// import { StakeholderDoesNotExistError } from './errors/StakeholderDoesNotExistError'
// import ENGAGEMENTS from '../../domain/engagements.enum'

// type CreateStakeholderRequest = {
//   stakeholderId: string
// }

// // @TODO
// // Verify null userId
// type CreateStakeholderResponse = Either<
//   StakeholderDoesNotExistError,
//   StakeholderEngagementPlan
// >

// export class CreateStakeholderEngagementPlan {
//   constructor(
//     private stakeholderEngagementPlansRepository: IStakeholderEngagementPlansRepository,
//   ) {}

//   async execute({
//     stakeholderId,
//   }: CreateStakeholderRequest): Promise<CreateStakeholderResponse> {
//     console.log('use-case')

//     const stakeholderEngagementPlanOrError = StakeholderEngagementPlan.

//     if (stakeholderEngagementPlanOrError.isLeft()) {
//       return left(stakeholderEngagementPlanOrError.value)
//     }

//     const stakeholderEngagementPlan = stakeholderEngagementPlanOrError.value

//     await this.stakeholderEngagementPlansRepository.create(
//       stakeholderEngagementPlan,
//     )

//     return right(stakeholderEngagementPlan)
//   }
// }
