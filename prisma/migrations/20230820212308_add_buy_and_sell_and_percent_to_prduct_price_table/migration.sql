/*
  Warnings:

  - Added the required column `percent` to the `ProductPrice` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductPrice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER,
    "buy" BIGINT,
    "sell" BIGINT,
    "percent" INTEGER NOT NULL,
    CONSTRAINT "ProductPrice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductPrice" ("id", "productId") SELECT "id", "productId" FROM "ProductPrice";
DROP TABLE "ProductPrice";
ALTER TABLE "new_ProductPrice" RENAME TO "ProductPrice";
CREATE UNIQUE INDEX "ProductPrice_productId_key" ON "ProductPrice"("productId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
