import { z } from 'zod'

export const ProjectCharterSchema = z.object({
  projectName: z.string().min(3).max(255),
  highLevelProjectDescription: z.string().min(3).max(255),
  startDate: z.date(),
  endDate: z.date(),
  projectPurpose: z.string().min(3).max(2000).nullish(),
  measurableProjectObjectives: z.string().min(3).max(2000).nullish(),
  keyBenefits: z.string().min(3).max(2000).nullish(),
  highLevelRequirements: z.string().min(3).max(2000).nullish(),
  boundaries: z.string().min(3).max(2000).nullish(),
  overallProjectRisk: z.string().min(3).max(2000).nullish(),
  summaryMilestoneSchedule: z.string().min(3).max(2000).nullish(),
  preApprovedFinancialResources: z.string().min(3).max(2000).nullish(),
  projectApprovalRequirements: z.string().min(3).max(2000).nullish(),
  successCriteria: z.string().min(3).max(2000).nullish(),
  projectExitCriteria: z.string().min(3).max(2000).nullish(),
  signed: z.boolean().nullish(),
  projectId: z.string().cuid2(),
})

export type ProjectCharterProps = z.infer<typeof ProjectCharterSchema>
