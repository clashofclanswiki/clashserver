/*
  Warnings:

  - You are about to drop the column `author` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `countOpened` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `courseLanguage` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `short_description` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "author",
DROP COLUMN "countOpened",
DROP COLUMN "courseLanguage",
DROP COLUMN "short_description",
DROP COLUMN "type";
