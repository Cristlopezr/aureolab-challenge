-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "stripePaymentIntentId" TEXT,
ADD COLUMN     "totalRefunded" INTEGER NOT NULL DEFAULT 0;
