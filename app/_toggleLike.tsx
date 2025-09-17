"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

const toggleLike = async (recipeId: string, userId: string, add: boolean) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
  });

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

  const isFavorite = await prisma.favoriteRecipe.findUnique({
    where: { recipeId, userId },
  });
  if (!isFavorite) {
    await prisma.favoriteRecipe.create({
      data: {
        recipeId,
        userId,
      },
    });
  }

  // const [updatedRecicpe,isFavorite] = await Promise([ prisma.recipe.update({
  //   where: { id: recipeId },
  //   data: { likes: newLikes },
  // });,await prisma.favoriteRecipe.create({
  //     data: {
  //       recipeId,
  //       userId,
  //     },
  //   });])
  revalidatePath("/");
};

export { toggleLike };
