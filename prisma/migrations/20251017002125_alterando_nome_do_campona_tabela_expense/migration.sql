/*
  Warnings:

  - You are about to drop the column `fixed` on the `expense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "expense" DROP COLUMN "fixed",
ADD COLUMN     "extra" BOOLEAN NOT NULL DEFAULT false;
