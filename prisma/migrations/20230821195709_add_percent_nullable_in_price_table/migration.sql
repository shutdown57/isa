-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Price" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER,
    "buy" BIGINT DEFAULT 0,
    "sell" BIGINT DEFAULT 0,
    "percent" INTEGER DEFAULT 0,
    CONSTRAINT "Price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Price" ("buy", "id", "percent", "productId", "sell") SELECT "buy", "id", "percent", "productId", "sell" FROM "Price";
DROP TABLE "Price";
ALTER TABLE "new_Price" RENAME TO "Price";
CREATE UNIQUE INDEX "Price_productId_key" ON "Price"("productId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
