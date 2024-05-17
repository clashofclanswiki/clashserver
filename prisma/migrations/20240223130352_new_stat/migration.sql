-- CreateTable
CREATE TABLE "statistics" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registered_user_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "statistics_pkey" PRIMARY KEY ("id")
);
