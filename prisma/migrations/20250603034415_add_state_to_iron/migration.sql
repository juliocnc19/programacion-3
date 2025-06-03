-- AlterTable
ALTER TABLE `irons` ADD COLUMN `stateId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `irons` ADD CONSTRAINT `irons_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `states`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
