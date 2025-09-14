import EditRecipeForm from "@/_components/EditRecipeForm/EditRecipeForm";
import prisma from "../../../../lib/prisma";

export default async function EditRecipe({
  params,
}: {
  params: { id: string };
}) {
  const id = await params.id;

  let recipeInfo;

  const recipe = await prisma.recipe.findUnique({
    where: { id: id },
  });

  const recipeImage = await prisma.recipeImages.findUnique({
    where: { recipeId: id },
  });

  recipeInfo = { ...recipe, key: await recipeImage?.key };

  const ingredients = [];

  if (recipeInfo?.ingredients) {
    const items = JSON.parse(recipeInfo.ingredients);
    ingredients.push(...items);
  }

  return (
    <>
      <div>
        <h1 className="text-2xl text-slate-500 font-bold py-6">Edit Recipe</h1>
        <EditRecipeForm recipeInfo={recipeInfo} />
      </div>
    </>
  );
}
