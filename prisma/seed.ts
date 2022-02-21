import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const recipeData = [
  {
    title: 'Dulce De Leche Cheesecake',
    servings: 10,
    image: 'https://spoonacular.com/recipeImages/641730-556x370.jpg',
    summary:
      'One serving contains 426 calories, 8g of protein, and 38g of fat. This gluten free and vegetarian recipe serves 10 and costs $1.28 per serving. From preparation to the plate, this recipe takes roughly 45 minutes. This recipe is liked by 31 foodies and cooks. Head to the store and pick up butter, cornstarch, dulce de leche, and a few other things to make it today. All things considered, we decided this recipe deserves a spoonacular score of 32%. This score is not so amazing. Try Dulce de Leche Cheesecake, Dulce de Leche Cheesecake for similar recipes.',
    dishTypes: {
      create: [
        {
          dishType: {
            create: {
              dish: 'side dish',
            },
          },
        },
      ],
    },
    instructions: {
      create: {
        steps: {
          create: [
            {
              number: 1,
              step: 'Toss the cookie crumbs into the melted butter in a mixing bowl. Reserve 1 tablespoon of the mixture for the topping. Press the rest of the mixture onto the bottom and up 3cm high of a greased 24cm spring form pan. Chill until its ready for use.Using electric mixer beat balance cream cheese and sugar in a large mixing bowl until smooth.',
              ingredients: {
                create: [
                  {
                    ingredient: {
                      create: {
                        name: 'cookie crumbs',
                        image: '',
                      },
                    },
                    amount: 1,
                    unit: 'tablespoon',
                  },
                  {
                    ingredient: {
                      create: {
                        name: 'cream cheese',
                        image: 'cream-cheese.jpg',
                      },
                    },
                    amount: 450,
                    unit: 'grams',
                  },
                  {
                    ingredient: {
                      create: {
                        name: 'butter',
                        image: 'butter-sliced.jpg',
                      },
                    },
                    amount: 1.5,
                    unit: 'sticks',
                  },
                  {
                    ingredient: {
                      create: {
                        name: 'sugar',
                        image: 'sugar-in-bowl.png',
                      },
                    },
                    amount: 0.5,
                    unit: 'cup',
                  },
                ],
              },
              equipments: {
                create: [
                  {
                    equipment: {
                      create: {
                        name: 'hand mixer',
                        image: 'hand-mixer.png',
                      },
                    },
                  },
                  {
                    equipment: {
                      create: {
                        name: 'mixing bowl',
                        image: 'mixing-bowl.jpg',
                      },
                    },
                  },
                  {
                    equipment: {
                      create: {
                        name: 'frying pan',
                        image: 'pan.png',
                      },
                    },
                  },
                ],
              },
            },
            {
              number: 2,
              step: 'Add yogurt and eggs, beating until just blended. Stir in cornstarch, dulce de leche, lemon juice and zest until blended.',
              ingredients: {
                create: [
                  {
                    ingredient: {
                      create: {
                        name: 'dulce de leche',
                        image: 'dulce-de-leche.png',
                      },
                    },
                    amount: 240,
                    unit: 'milliliters',
                  },
                  {
                    ingredient: {
                      create: {
                        name: 'lemon juice',
                        image: 'lemon-juice.jpg',
                      },
                    },
                    amount: 1,
                    unit: '',
                  },
                  {
                    ingredient: {
                      create: {
                        name: 'corn starch',
                        image: 'white-powder.jpg',
                      },
                    },
                    amount: 1,
                    unit: 'tablespoon',
                  },
                  {
                    ingredient: {
                      create: {
                        name: 'yogurt',
                        image: 'plain-yogurt.jpg',
                      },
                    },
                    amount: 150,
                    unit: 'grams',
                  },
                  {
                    ingredient: {
                      create: {
                        name: 'egg',
                        image: 'egg.png',
                      },
                    },
                    amount: 2,
                    unit: '',
                  },
                ],
              },
              equipments: {},
            },
            {
              number: 3,
              step: 'Pour the mixture into the crust and sprinkle the top with reserved cookie crumbs. Steamed bake the cheesecake at 165C/330F for 65 minutes until almost set. Turn oven off. Leave the cake with the oven door ajar for 1 hour. Cool completely and chill at least 4 hours or overnight until firm.',
              ingredients: {
                create: [
                  {
                    ingredient: {
                      create: {
                        name: 'cookie crumbs',
                        image: '',
                      },
                    },
                    amount: 1,
                    unit: 'tablespoon',
                  },
                  {
                    ingredient: {
                      create: {
                        name: 'crust',
                        image: '',
                      },
                    },
                    amount: 0,
                    unit: '',
                  },
                ],
              },
              equipments: {
                create: [
                  {
                    equipment: {
                      create: {
                        name: 'oven',
                        image: 'oven.jpg',
                      },
                    },
                    temperatureNumber: 165,
                    temperatureUnit: 'Celsius',
                  },
                ],
              },
              length: 365,
              lengthType: 'minutes',
            },
          ],
        },
      },
    },
  },
];

async function main() {
  console.log('Start seeding ...');
  for (const r of recipeData) {
    const recipe = await prisma.recipe.create({
      data: r,
    });
    console.log(`Created user with id: ${recipe.id}`);
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
