/*
  Warnings:

  - You are about to drop the column `instructionsId` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `recipeId` to the `Instructions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Instructions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "Instructions_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Instructions" ("id") SELECT "id" FROM "Instructions";
DROP TABLE "Instructions";
ALTER TABLE "new_Instructions" RENAME TO "Instructions";
CREATE UNIQUE INDEX "Instructions_recipeId_key" ON "Instructions"("recipeId");
CREATE TABLE "new_Recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "servings" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "summary" TEXT NOT NULL
);
INSERT INTO "new_Recipe" ("id", "image", "servings", "summary", "title") SELECT "id", "image", "servings", "summary", "title" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
CREATE UNIQUE INDEX "Recipe_title_key" ON "Recipe"("title");
CREATE INDEX "Recipe_title_idx" ON "Recipe"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
