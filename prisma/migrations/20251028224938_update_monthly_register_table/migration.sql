/*
  Warnings:

  - Added the required column `registerDate` to the `monthly_registers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "monthly_registers" ADD COLUMN     "registerDate" TIMESTAMP(3) NOT NULL;
