import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/recipe", async (req, res) => {
  const recipes = await prisma.recipe.findMany({
    include: {
      dishTypes: true,
      instructions: {
        include: {
          steps: {
            include: {
              ingredients: true,
              equipments: true,
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

const server = app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
