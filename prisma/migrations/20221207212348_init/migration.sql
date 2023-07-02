-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Installment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paid" BOOLEAN DEFAULT false,
    "description" TEXT,
    "amount" INTEGER DEFAULT 0,
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
