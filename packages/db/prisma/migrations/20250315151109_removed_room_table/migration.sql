/*
  Warnings:

  - The values [USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `roomId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `documentId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');
ALTER TABLE "Member" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Member" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "Member" ALTER COLUMN "role" SET DEFAULT 'EDITOR';
COMMIT;

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_documentId_fkey";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "roomId",
ADD COLUMN     "documentId" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'EDITOR';

-- AlterTable
ALTER TABLE "Shape" ALTER COLUMN "color" SET DEFAULT '#FFFFFF';

-- DropTable
DROP TABLE "Room";

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
