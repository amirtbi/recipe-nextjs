import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function PUT(req: Request) {
  try {
    const {
      name,
      recipeId,
      userId,
      instructions,
      file,
      servings,
      prepTime,
      category,
    } = await req.json();

    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      return NextResponse.json(
        { message: "User not found!", success: false },
        { status: 500 }
      );
    }

    await prisma.recipe.update({
      where: { id: recipeId },
      data: {
        userId,
        name: name ?? undefined,
        instructions: instructions ?? undefined,
        prepTime: isNaN(prepTime) ? undefined : prepTime,
        servings: isNaN(servings) ? undefined : servings,
        recipeCategories: {
          deleteMany: {},
          create: category.map((name: number) => ({
            category: { connect: { name: name } },
          })),
        },
      },
    });

    return NextResponse.json({
      message: "Recipe updated successfully",
      success: true,
    });
  } catch (e) {
    return NextResponse.json({ message: e, success: false }, { status: 500 });
  }
}
