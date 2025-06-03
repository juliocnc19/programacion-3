/*
  Warnings:

  - You are about to drop the column `ranchId` on the `irons` table. All the data in the column will be lost.
  - You are about to drop the `ranches` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ci]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `irons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ci` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `irons` DROP FOREIGN KEY `irons_ranchId_fkey`;

-- DropForeignKey
ALTER TABLE `ranches` DROP FOREIGN KEY `ranches_stateId_fkey`;

-- DropForeignKey
ALTER TABLE `ranches` DROP FOREIGN KEY `ranches_userId_fkey`;

-- DropIndex
DROP INDEX `irons_ranchId_key` ON `irons`;

-- AlterTable
ALTER TABLE `irons` DROP COLUMN `ranchId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `ci` INTEGER NOT NULL;

-- DropTable
DROP TABLE `ranches`;

-- CreateIndex
CREATE UNIQUE INDEX `users_ci_key` ON `users`(`ci`);

-- AddForeignKey
ALTER TABLE `irons` ADD CONSTRAINT `irons_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
