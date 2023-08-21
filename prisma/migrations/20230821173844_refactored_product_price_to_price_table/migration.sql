/*
  Warnings:

  - You are about to drop the `ProductPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductPrice";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Price" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER,
    "buy" BIGINT DEFAULT 0,
    "sell" BIGINT DEFAULT 0,
    "percent" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Price_productId_key" ON "Price"("productId");
