/*
  Warnings:

  - You are about to drop the column `guestId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Guest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_guestId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "guestId",
ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "shippingId" INTEGER NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PAID';

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "image" SET NOT NULL;

-- DropTable
DROP TABLE "Guest";

-- CreateTable
CREATE TABLE "Shipping" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Shipping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "Shipping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
