/*
  Warnings:

  - Added the required column `content` to the `Endorsement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Endorsement" ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "metrics" JSONB,
ADD COLUMN     "year" INTEGER DEFAULT 2024;
