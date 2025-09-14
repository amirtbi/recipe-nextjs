"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

const toggleLike = async (recipeId: string, add: boolean) => {
  const recipe = await prisma.recipe.findUnique({ where: { id: recipeId } });
  if (!recipe) return;
  let newLikes;
  if (add) {
    newLikes = (recipe.likes || 0) + 1;
  } else {
    newLikes = (recipe.likes || 0) - 1;
  }
  await prisma.recipe.update({
    where: { id: recipeId },
    data: { likes: newLikes },
  });
  revalidatePath("/");
};

export { toggleLike };
