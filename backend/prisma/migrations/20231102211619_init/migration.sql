-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workspaces` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(500) NULL,
    `plan` ENUM('FREE', 'SUBSCRIPTION') NOT NULL,
    `plan_status` ENUM('ACTIVE', 'INACTIVE') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_workspaces` (
    `workspace_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'ACTIVE', 'BLOCKED') NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`workspace_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(500) NULL,
    `workspace_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_projects` (
    `project_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'ACTIVE', 'BLOCKED') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`project_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_project_roles` (
    `project_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'PROJECT_MANAGER', 'PROFESSOR', 'STAKEHOLDER', 'DEVELOPER', 'SPONSOR') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`project_id`, `user_id`, `role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metric` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `workspace_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeeklyEvaluation` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `type` ENUM('INDIVIDUAL', 'GROUP') NOT NULL,
    `status` ENUM('OPEN', 'CLOSED') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_charters` (
    `id` VARCHAR(191) NOT NULL,
    `project_name` VARCHAR(191) NOT NULL,
    `high_level_project_description` TEXT NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `project_purpose` VARCHAR(191) NULL,
    `measurable_project_objectives` TEXT NULL,
    `key_benefits` TEXT NULL,
    `high_level_requirements` TEXT NULL,
    `boundaries` TEXT NULL,
    `overall_project_risk` TEXT NULL,
    `summary_milestone_schedule` TEXT NULL,
    `pre_approved_financial_resources` TEXT NULL,
    `project_approval_requirements` TEXT NULL,
    `success_criteria` TEXT NULL,
    `project_exit_criteria` TEXT NULL,
    `signed` BOOLEAN NULL,
    `project_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `project_charters_project_id_key`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_case` (
    `id` VARCHAR(191) NOT NULL,
    `business_needs` VARCHAR(191) NOT NULL,
    `situation_analysis` VARCHAR(191) NOT NULL,
    `recommendation` VARCHAR(191) NOT NULL,
    `evaluation` VARCHAR(191) NOT NULL,
    `project_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `business_case_project_id_key`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `benefits_management_plans` (
    `id` VARCHAR(191) NOT NULL,
    `target_benefits` VARCHAR(191) NOT NULL,
    `strategic_alignment` VARCHAR(191) NOT NULL,
    `schedule_benefits` VARCHAR(191) NOT NULL,
    `benefits_owner` VARCHAR(191) NOT NULL,
    `indicators` VARCHAR(191) NOT NULL,
    `premises` VARCHAR(191) NOT NULL,
    `risks` VARCHAR(191) NOT NULL,
    `project_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `benefits_management_plans_project_id_key`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assumption_logs` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(2000) NOT NULL,
    `type` ENUM('ASSUMPTION', 'CONTRAINT') NOT NULL,
    `project_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stakeholders` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('EXTERNAL', 'INTERNAL') NOT NULL,
    `main_project_role` ENUM('CLIENT', 'TEAM', 'PROVIDER', 'PROJECT_MANAGER', 'SPONSOR', 'OTHERS') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `organization` VARCHAR(191) NOT NULL,
    `organization_position` VARCHAR(191) NOT NULL,
    `main_project_responsibility` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `workplace` VARCHAR(191) NOT NULL,
    `essential_requirements` VARCHAR(191) NOT NULL,
    `main_expectations` VARCHAR(191) NOT NULL,
    `greater_interest_phase` VARCHAR(191) NOT NULL,
    `observations` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `project_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `stakeholders_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stakeholder_engagement_plans` (
    `id` VARCHAR(191) NOT NULL,
    `stakeholder_id` VARCHAR(191) NOT NULL,
    `current_engagement` ENUM('UNAWARE', 'SUPPORTIVE', 'LEADING', 'NEUTRAL', 'RESISTANT') NOT NULL,
    `desired_engagement` ENUM('UNAWARE', 'SUPPORTIVE', 'LEADING', 'NEUTRAL', 'RESISTANT') NOT NULL,
    `interest_level` INTEGER NOT NULL,
    `power_level` INTEGER NOT NULL,
    `influence_level` INTEGER NOT NULL,
    `engagement_management_strategy` VARCHAR(2000) NOT NULL,
    `scope_impact_changes_to_stakeholder` VARCHAR(2000) NOT NULL,
    `observations` VARCHAR(2000) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_workspaces` ADD CONSTRAINT `user_workspaces_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `workspaces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_workspaces` ADD CONSTRAINT `user_workspaces_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `workspaces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_projects` ADD CONSTRAINT `user_projects_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_projects` ADD CONSTRAINT `user_projects_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_project_roles` ADD CONSTRAINT `user_project_roles_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_project_roles` ADD CONSTRAINT `user_project_roles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `metric` ADD CONSTRAINT `metric_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `workspaces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_charters` ADD CONSTRAINT `project_charters_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_case` ADD CONSTRAINT `business_case_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `benefits_management_plans` ADD CONSTRAINT `benefits_management_plans_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assumption_logs` ADD CONSTRAINT `assumption_logs_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stakeholders` ADD CONSTRAINT `stakeholders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stakeholders` ADD CONSTRAINT `stakeholders_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stakeholder_engagement_plans` ADD CONSTRAINT `stakeholder_engagement_plans_stakeholder_id_fkey` FOREIGN KEY (`stakeholder_id`) REFERENCES `stakeholders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
