/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `CategoriesOnNotes` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `CategoriesOnNotes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CategoriesOnNotes" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
