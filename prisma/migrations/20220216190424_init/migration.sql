-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "servings" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "instructionsId" TEXT NOT NULL,
    CONSTRAINT "Recipe_instructionsId_fkey" FOREIGN KEY ("instructionsId") REFERENCES "Instructions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DishTypes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dish" TEXT NOT NULL,
    "recipeId" TEXT,
    CONSTRAINT "DishTypes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Instructions" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Steps" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "step" TEXT NOT NULL,
    "instructionsId" TEXT,
    "length" INTEGER,
    "lengthType" TEXT,
    CONSTRAINT "Steps_instructionsId_fkey" FOREIGN KEY ("instructionsId") REFERENCES "Instructions" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "stepsId" TEXT,
    "amount" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    CONSTRAINT "Ingredients_stepsId_fkey" FOREIGN KEY ("stepsId") REFERENCES "Steps" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "stepsId" TEXT,
    "temperatureNumber" INTEGER,
    "temperatureUnit" TEXT,
    CONSTRAINT "Equipment_stepsId_fkey" FOREIGN KEY ("stepsId") REFERENCES "Steps" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_title_key" ON "Recipe"("title");
