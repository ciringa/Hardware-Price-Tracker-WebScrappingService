-- CreateTable
CREATE TABLE "Issue" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "When" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Reason" TEXT,
    "At" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StaticLink" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Link" TEXT NOT NULL,
    "GeneratedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_StaticLink" ("GeneratedAt", "Id", "Link") SELECT "GeneratedAt", "Id", "Link" FROM "StaticLink";
DROP TABLE "StaticLink";
ALTER TABLE "new_StaticLink" RENAME TO "StaticLink";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
