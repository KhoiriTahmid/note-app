/*
  Warnings:

  - You are about to drop the column `uncomplitedDates` on the `EndlessTask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EndlessTask" DROP COLUMN "uncomplitedDates";

-- CreateTable
CREATE TABLE "RelationEndlessCompleted" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "taskId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "RelationEndlessCompleted_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RelationEndlessCompleted_accountId_date_taskId_idx" ON "RelationEndlessCompleted"("accountId", "date", "taskId");

-- CreateIndex
CREATE UNIQUE INDEX "RelationEndlessCompleted_accountId_date_taskId_key" ON "RelationEndlessCompleted"("accountId", "date", "taskId");

-- AddForeignKey
ALTER TABLE "RelationEndlessCompleted" ADD CONSTRAINT "RelationEndlessCompleted_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "EndlessTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationEndlessCompleted" ADD CONSTRAINT "RelationEndlessCompleted_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
