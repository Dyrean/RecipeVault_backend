import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express, { json } from 'express';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/api/recipes/:page', async (req, res) => {
  try {
    const { page } = req.params;
    const skip = Number(page) <= 1 ? 0 : 10 * (Number(page) - 1);
    const recipes = await prisma.recipe.findMany({
      skip,
      take: 10,
      include: {
        dishTypes: {
          include: {
            dishType: true,
          },
        },
        instructions: {
          include: {
            steps: {
              include: {
                ingredients: {
                  include: {
                    ingredient: true,
                  },
                },
                equipments: {
                  include: {
                    equipment: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get('/api/recipes', async (req, res) => {
  const recipes = await prisma.recipe.findMany({
    include: {
      dishTypes: {
        include: {
          dishType: true,
        },
      },
      instructions: {
        include: {
          steps: {
            include: {
              ingredients: {
                include: {
                  ingredient: true,
                },
              },
              equipments: {
                include: {
                  equipment: true,
                },
              },
            },
          },
        },
      },
    },
  });
  res.json(recipes);
});

app.get('/api/recipe/', async (req, res) => {
  const { title, id }: { title?: string; id?: string } = req.body;
  const { dish }: { dish?: string } = req.query;
  console.log(dish);
  try {
    let recipe;
    if (id !== undefined) {
      recipe = await prisma.recipe.findUnique({
        where: { id: String(id) },
      });
    } else if (title !== undefined) {
      recipe = await prisma.recipe.findUnique({
        where: { title: String(title) },
      });
    } else if (dish !== undefined) {
      recipe = await prisma.recipe.findMany({
        where: {
          dishTypes: {
            some: {
              dishType: {
                dish: String(dish),
              },
            },
          },
        },
      });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get('/api/recipe/ingredients', async (req, res) => {
  const { ingredients }: { ingredients?: string[] } = req.body;
  try {
    const recipe = await prisma.recipe.findMany({
      where: {
        instructions: {
          steps: {
            some: {
              ingredients: {
                every: {
                  ingredient: {
                    name: { in: ingredients },
                  },
                },
              },
            },
          },
        },
      },
    });
    res.json(recipe);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get('/api/dishTypes', async (req, res) => {
  try {
    const dishTypes = await prisma.dishTypes.findMany({
      select: {
        id: true,
        dish: true,
      },
    });
    res.json(dishTypes);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
);
