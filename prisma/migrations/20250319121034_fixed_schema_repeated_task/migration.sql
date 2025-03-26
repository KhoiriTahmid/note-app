/*
  Warnings:

  - The primary key for the `RelationNoteRepeatedTask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[date,repeatedTaskId,accountId]` on the table `RelationNoteRepeatedTask` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `RelationNoteRepeatedTask` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `startTime` on the `RepeatedTask` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTime` on the `RepeatedTask` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RelationNoteRepeatedTask" DROP CONSTRAINT "RelationNoteRepeatedTask_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "RelationNoteRepeatedTask_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RepeatedTask" DROP COLUMN "startTime",
ADD COLUMN     "startTime" VARCHAR(8) NOT NULL,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" VARCHAR(8) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RelationNoteRepeatedTask_date_repeatedTaskId_accountId_key" ON "RelationNoteRepeatedTask"("date", "repeatedTaskId", "accountId");
