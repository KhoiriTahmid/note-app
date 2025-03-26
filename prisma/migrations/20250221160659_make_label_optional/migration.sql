/*
  Warnings:

  - You are about to drop the column `title` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "title",
ALTER COLUMN "label" DROP NOT NULL,
ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "files" DROP NOT NULL;
