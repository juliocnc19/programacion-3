/*
  Warnings:

  - Made the column `stateId` on table `irons` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `irons` DROP FOREIGN KEY `irons_stateId_fkey`;

-- AlterTable
ALTER TABLE `irons` MODIFY `stateId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `irons` ADD CONSTRAINT `irons_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `states`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
