/*
  Warnings:

  - Made the column `name` on table `Account` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "bank" TEXT,
    "amount" INTEGER DEFAULT 0,
    "accountNumber" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Account" ("accountNumber", "amount", "bank", "createdAt", "description", "id", "name", "updatedAt") SELECT "accountNumber", "amount", "bank", "createdAt", "description", "id", "name", "updatedAt" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
