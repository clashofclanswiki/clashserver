/*
  Warnings:

  - You are about to drop the column `views` on the `post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "views",
ADD COLUMN     "countOpened" INTEGER DEFAULT 0,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "post_slug_key" ON "post"("slug");
