-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invoice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT,
    "totalAmount" INTEGER DEFAULT 0,
    "description" TEXT,
    "installment" BOOLEAN DEFAULT true,
    "installmentQuantity" INTEGER DEFAULT 0,
    "prepayment" INTEGER DEFAULT 0,
    "buy" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "customerId" INTEGER,
    "accountId" INTEGER,
    "vendorId" INTEGER,
    CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Invoice_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Invoice_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("accountId", "buy", "createdAt", "customerId", "description", "id", "installment", "installmentQuantity", "number", "prepayment", "totalAmount", "updatedAt", "vendorId") SELECT "accountId", "buy", "createdAt", "customerId", "description", "id", "installment", "installmentQuantity", "number", "prepayment", "totalAmount", "updatedAt", "vendorId" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE UNIQUE INDEX "Invoice_number_key" ON "Invoice"("number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
