import prisma from "@/../lib/prisma";
import { MagnifyingGlassCircleIcon, PlusIcon } from "@heroicons/react/16/solid";

import Link from "next/link";
import { minioApiService } from "../lib/minio/minio-services";
import Image from "next/image";
import RecipeInfoBar from "./_components/RecipeInfobar/RecipeInfobar";

const Page = async () => {
  const recipes = await prisma.recipe.findMany({
    include: {
      Images: true,
    },
  });

  const recipesWithUrls = await Promise.all(
    recipes.map(async (recipe) => ({
      ...recipe,
      imageUrls: await Promise.all(
        recipe.Images.map((img) => minioApiService.getFile(img.key))
      ),
    }))
  );

  return (
    <div className="flex flex-col">
      <div className="flex gap-md justify-between items-center">
        <h1 className="text-2xl text-slate-500 font-bold py-6">Recipes</h1>
        <button className="bg-slate-600 text-sm flex items-center gap-4 hover:cursor-pointer px-3 py-1 rounded hover:bg-slate-500 hover:text-white">
          <Link href="/recipes/new-recipe">New Recipe</Link>
          <PlusIcon className="size-4" />
        </button>
      </div>
      <div className="">
        <div className="rounded-md grid grid-cols-1  text-pink-100 space-y-2 list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
          {recipesWithUrls.map((recipe) => (
            <Link
              href={`recipes/${recipe.id}`}
              key={recipe.id}
              className="flex flex-col bg-slate-200 p-2 rounded justify-between items-center gap-5 text-sm m-2"
            >
              <div className="relative overflow-hidden aspect-video w-full">
                <div className="absolute w-full h-full z-3 bg-black/30"></div>

                <Image
                  alt="recipe"
                  src={recipe.imageUrls[0] || ""}
                  fill
                  className="rounded-md object-contain"
                />
                <div className="w-full flex px-4 items-center justify-between text-white font-bold absolute z-4 bottom-5 left-0">
                  <h1 className="truncate">{recipe.name}</h1>
                  <RecipeInfoBar recipeId={recipe.id} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Page;
