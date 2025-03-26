/*
  Warnings:

  - Changed the type of `startTime` on the `EndlessTask` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTime` on the `EndlessTask` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EndlessTask" DROP COLUMN "startTime",
ADD COLUMN     "startTime" VARCHAR(8) NOT NULL,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" VARCHAR(8) NOT NULL;

-- CreateIndex
CREATE INDEX "Task_accountId_id_idx" ON "Task"("accountId", "id");

-- CreateIndex
CREATE INDEX "Task_noteId_accountId_idx" ON "Task"("noteId", "accountId");
