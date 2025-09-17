import RecipeList from "@/_components/RecipeList/RecipeList";
import prisma from "../../../lib/prisma";
import { minioApiService } from "../../../lib/minio/minio-services";

const SearchRecipe = async ({
  searchParams,
}: {
  searchParams: { char: string };
}) => {
  const userSearch = searchParams.char;

  const foundRecipes = await prisma.recipe.findMany({
    where: {
      OR: [
        { name: { contains: userSearch } },
        { name: { contains: userSearch } },
        {
          recipeCategories: {
            some: {
              category: {
                name: { contains: userSearch },
              },
            },
          },
        },
      ],
    },
    include: {
      Image: true,
      recipeCategories: {
        include: {
          category: true,
        },
      },
    },
  });

  const recipesWithUrls = await Promise.all(
    foundRecipes.map(async (recipe) => ({
      ...recipe,
      imageUrl: recipe.Image
        ? await minioApiService.getFile(recipe.Image.key)
        : "",
    }))
  );

  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-slate-600 py-2">Found Recipes</h1>
        <RecipeList recipes={recipesWithUrls} />
      </div>
    </>
  );
};

export default SearchRecipe;
