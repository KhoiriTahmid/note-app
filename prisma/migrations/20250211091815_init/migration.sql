-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "RepeatType" AS ENUM ('daily', 'weekly', 'monthly', 'yearly');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "text" TEXT NOT NULL,
    "files" JSONB NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "text" VARCHAR(200) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelationNoteRepeatedTask" (
    "date" TIMESTAMP(3) NOT NULL,
    "repeatedTaskId" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "RelationNoteRepeatedTask_pkey" PRIMARY KEY ("date","repeatedTaskId","accountId")
);

-- CreateTable
CREATE TABLE "RepeatedTask" (
    "id" TEXT NOT NULL,
    "text" VARCHAR(200) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepeatedTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EndlessTask" (
    "id" TEXT NOT NULL,
    "text" VARCHAR(200) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "uncomplitedDates" JSONB NOT NULL,
    "repeatType" "RepeatType" NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "EndlessTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_accountId_date_key" ON "Note"("accountId", "date");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationNoteRepeatedTask" ADD CONSTRAINT "RelationNoteRepeatedTask_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationNoteRepeatedTask" ADD CONSTRAINT "RelationNoteRepeatedTask_repeatedTaskId_fkey" FOREIGN KEY ("repeatedTaskId") REFERENCES "RepeatedTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EndlessTask" ADD CONSTRAINT "EndlessTask_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
