/*
  Warnings:

  - You are about to drop the `statistics` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "link_downloads" JSONB[];

-- DropTable
DROP TABLE "statistics";
