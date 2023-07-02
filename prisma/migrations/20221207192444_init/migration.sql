/*
  Warnings:

  - You are about to alter the column `paid` on the `Installment` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Boolean`.
  - You are about to alter the column `installment` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Boolean`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Installment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "date" DATETIME,
    "customerId" INTEGER,
    "invoiceId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Installment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Installment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Installment" ("amount", "createdAt", "customerId", "date", "description", "id", "invoiceId", "paid", "updatedAt") SELECT "amount", "createdAt", "customerId", "date", "description", "id", "invoiceId", "paid", "updatedAt" FROM "Installment";
DROP TABLE "Installment";
ALTER TABLE "new_Installment" RENAME TO "Installment";
CREATE TABLE "new_Invoice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT,
    "totalAmount" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "installment" BOOLEAN NOT NULL DEFAULT true,
    "installmentQuantity" INTEGER NOT NULL DEFAULT 0,
    "prepayment" INTEGER DEFAULT 0,
    "buy" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "customerId" INTEGER,
    "accountId" INTEGER,
    CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Invoice_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("createdAt", "customerId", "description", "id", "installment", "installmentQuantity", "number", "prepayment", "totalAmount", "updatedAt") SELECT "createdAt", "customerId", "description", "id", "installment", "installmentQuantity", "number", "prepayment", "totalAmount", "updatedAt" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE UNIQUE INDEX "Invoice_number_key" ON "Invoice"("number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
