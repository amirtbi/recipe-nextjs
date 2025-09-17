import prisma from "@/../lib/prisma";
import { PlusIcon } from "@heroicons/react/16/solid";

import Link from "next/link";
import { minioApiService } from "../lib/minio/minio-services";
import Image from "next/image";
import RecipeInfoBar from "./_components/RecipeInfobar/RecipeInfobar";
import SearchRecipeForm from "./_components/SearchRecipeForm/SearchRecipeForm";
import RecipeList from "./_components/RecipeList/RecipeList";

const Page = async () => {
  const [categories, recipes] = await Promise.all([
    prisma.category.findMany(),
    prisma.recipe.findMany({
      include: {
        Image: true,
      },
    }),
  ]);

  const recipesWithUrls = await Promise.all(
    recipes.map(async (recipe) => ({
      ...recipe,
      imageUrl: recipe.Image
        ? await minioApiService.getFile(recipe.Image.key)
        : "",
    }))
  );

  return (
    <div className="flex flex-col">
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-slate-500 font-bold py-6">Recipes</h1>
          <button className="bg-slate-600 text-sm flex items-center gap-4 hover:cursor-pointer px-3 py-1 rounded hover:bg-slate-500 hover:text-white">
            <Link href="/recipes/new-recipe">New Recipe</Link>
            <PlusIcon className="size-4" />
          </button>
        </div>
        <article className="flex items-center bg-slate-200 rounded-lg">
          <SearchRecipeForm />
        </article>
      </section>
      <div className=" rounded p-2 flex flex-col gap-2">
        <section>
          <h4 className="text-slate-500 text-md py-2 font-bold">Categories</h4>
          <article className="p-2 bg-slate-200 rounded">
            <div className="flex gap-2 max-w-[800px] overflow-x-auto px-2">
              {categories.map((category, index) => (
                <div
                  key={category.name}
                  className="flex text-xs p-2 text-slate-200 items-center justify-center rounded-lg bg-slate-500"
                >
                  {category.name.toUpperCase()}
                </div>
              ))}
            </div>
          </article>
        </section>
        <section className="p-2">
          <h4 className="text-slate-500 text-md py-2 font-bold">
            Popular Recipes
          </h4>
          <article className="p-2 bg-slate-200 rounded">
            <RecipeList recipes={recipesWithUrls} />
          </article>
        </section>
      </div>
    </div>
  );
};
export default Page;
