-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "servings" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "summary" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DishTypes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dish" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DishTypesOnRecipes" (
    "recipeId" TEXT NOT NULL,
    "dishTypeId" TEXT NOT NULL,

    PRIMARY KEY ("recipeId", "dishTypeId"),
    CONSTRAINT "DishTypesOnRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DishTypesOnRecipes_dishTypeId_fkey" FOREIGN KEY ("dishTypeId") REFERENCES "DishTypes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Instructions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "Instructions_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
CREATE TABLE "StepsOnIngredient" (
    "stepId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "unit" TEXT NOT NULL,

    PRIMARY KEY ("stepId", "ingredientId"),
    CONSTRAINT "StepsOnIngredient_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Steps" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StepsOnIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "StepsOnEquipment" (
    "stepId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "temperatureNumber" INTEGER,
    "temperatureUnit" TEXT,

    PRIMARY KEY ("stepId", "equipmentId"),
    CONSTRAINT "StepsOnEquipment_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Steps" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StepsOnEquipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_title_key" ON "Recipe"("title");

-- CreateIndex
CREATE INDEX "Recipe_title_idx" ON "Recipe"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Instructions_recipeId_key" ON "Instructions"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredients_name_key" ON "Ingredients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_name_key" ON "Equipment"("name");
