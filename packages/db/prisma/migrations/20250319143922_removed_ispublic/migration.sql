/*
  Warnings:

  - You are about to drop the column `isPublic` on the `Document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "isPublic",
ADD COLUMN     "isCollaborative" BOOLEAN NOT NULL DEFAULT false;
