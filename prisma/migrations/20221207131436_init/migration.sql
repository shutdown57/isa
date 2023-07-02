/*
  Warnings:

  - Added the required column `updatedAt` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Invoice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT,
    "totalAmount" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "installment" INTEGER NOT NULL DEFAULT 0,
    "installmentQuantity" INTEGER NOT NULL DEFAULT 0,
    "prepayment" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "customerId" INTEGER,
    CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Installment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paid" INTEGER NOT NULL DEFAULT 0,
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

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "representativeId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Customer_representativeId_fkey" FOREIGN KEY ("representativeId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("address", "city", "description", "id", "name", "phone", "representativeId") SELECT "address", "city", "description", "id", "name", "phone", "representativeId" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT,
    "bank" TEXT,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "accountNumber" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Account" ("accountNumber", "amount", "bank", "description", "id", "name") SELECT "accountNumber", "amount", "bank", "description", "id", "name" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_number_key" ON "Invoice"("number");
