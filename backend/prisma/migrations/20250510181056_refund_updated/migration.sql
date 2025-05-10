/*
  Warnings:

  - Added the required column `stripeCreatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Refund` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Refund` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeCreatedAt` to the `Refund` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerName" TEXT,
ADD COLUMN     "stripeCreatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Refund" ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "reason" TEXT,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "stripeCreatedAt" TIMESTAMP(3) NOT NULL;
