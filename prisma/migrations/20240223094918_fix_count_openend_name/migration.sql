/*
  Warnings:

  - You are about to drop the column `countOpened` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "countOpened",
ADD COLUMN     "count_opened" INTEGER DEFAULT 0;
