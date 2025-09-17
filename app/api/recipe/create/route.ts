import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, name, servings, prepTime, instructions, category } =
      await req.json();

    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      return NextResponse.json(
        { message: "User not found!", success: false },
        { status: 500 }
      );
    }

    const response = await prisma.recipe.create({
      data: {
        userId,
        name,
        servings,
        prepTime,
        instructions,
        ingredients: JSON.stringify([
          { name: "Spaghetti", amount: 400, unit: "grams" },
          { name: "Eggs", amount: 3, unit: "large" },
          { name: "Parmesan Cheese", amount: 100, unit: "grams" },
          { name: "Pancetta", amount: 150, unit: "grams" },
          { name: "Garlic", amount: 2, unit: "cloves" },
          { name: "Salt", amount: 1, unit: "teaspoon" },
          { name: "Black Pepper", amount: 0.5, unit: "teaspoon" },
        ]),
        recipeCategories: {
          create: {
            category: {
              connectOrCreate: {
                where: { name: category }, // check if category exists
                create: { name: category }, // if not, create it
              },
            },
          },
        },
      },
    });

    if (!response) {
      return NextResponse.json(
        {
          message: "Creating new recipe failed",
          sucesss: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Recipe created Successfully",
      success: true,
      data: response,
    });
  } catch (e) {
    return NextResponse.json({ message: e, success: false });
  }
}
