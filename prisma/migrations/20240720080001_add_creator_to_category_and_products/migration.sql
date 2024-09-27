/*
  Warnings:

  - Added the required column `createdBy` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addedBy` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "createdBy" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "addedBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
