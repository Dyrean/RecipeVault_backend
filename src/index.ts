import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/api/recipe", async (req, res) => {
  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      title: true,
      servings: true,
      image: true,
      summary: true,
      dishTypes: {
        select: {
          id: true,
          dish: true,
        },
      },
      instructions: {
        select: {
          id: true,
          steps: {
            select: {
              id: true,
              number: true,
              step: true,
              ingredients: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  amount: true,
                  unit: true,
                },
              },
              equipments: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  temperatureNumber: true,
                  temperatureUnit: true,
                },
              },
              length: true,
              lengthType: true,
            },
          },
        },
      },
    },
  });
  res.json(recipes);
});

app.get(`/api/recipe/:id`, async (req, res) => {
  const { id }: { id?: string } = req.params;
  console.log(id);
  const post = await prisma.recipe.findUnique({
    where: { id: String(id) },
  });
  res.json(post);
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
