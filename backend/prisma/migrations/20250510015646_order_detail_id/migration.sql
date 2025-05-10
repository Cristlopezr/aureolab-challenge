/*
  Warnings:

  - The primary key for the `OrderDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OrderDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("orderId", "productId");
