/*
  Warnings:

  - You are about to drop the column `count_opened` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `course_language` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `link_downloads` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `programming_languages` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `post` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseLanguage` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programmingLanguages` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "count_opened",
DROP COLUMN "course_language",
DROP COLUMN "created_at",
DROP COLUMN "link_downloads",
DROP COLUMN "programming_languages",
DROP COLUMN "updated_at",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "countOpened" INTEGER DEFAULT 0,
ADD COLUMN     "courseLanguage" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "programmingLanguages" JSONB NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
