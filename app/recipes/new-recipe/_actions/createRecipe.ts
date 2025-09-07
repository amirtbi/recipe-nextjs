"use server";

import prisma from "@/../lib/prisma";
import { revalidatePath } from "next/cache";

export const createRecipe = async (prevState: any, formDate: FormData) => {
  try {
    const userId = formDate.get("userId") as string;
    const name = formDate.get("name") as string;
    const servings = Number(formDate.get("servings"));
    const prepTime = Number(formDate.get("prepTime"));
    const instructions = formDate.get("instructions") as string;

    if (!formDate.values()) {
      return { success: false, message: "Form is not valid" };
    }

    await prisma.recipe.create({
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
        imageUrl: "",
      },
    });

    revalidatePath("/home");

    return { success: true, message: "Recipe created!" };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Something went wrong." };
  }
};
