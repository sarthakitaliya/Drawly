/*
  Warnings:

  - You are about to drop the column `freehandPoints` on the `Shape` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shape" DROP COLUMN "freehandPoints",
ADD COLUMN     "points" JSONB;
