import prisma from "@/../lib/prisma";
import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

const Page = async () => {
  const recipes = await prisma.recipe.findMany();
  return (
    <div className="flex flex-col">
      <div className="flex gap-md justify-between items-center">
        <h1 className="text-4xl font-bold py-4">Recipes</h1>
        <button className="bg-slate-600 text-sm flex items-center gap-4 hover:cursor-pointer px-3 py-1 rounded hover:bg-slate-500 hover:text-white">
          <Link href="/recipes/new-recipe">New Recipe</Link>
          <PlusIcon className="size-4" />
        </button>
      </div>
      <div className="rounded-md bg-slate-800/100 shadow-md">
        <ol className="flex flex-col text-pink-100 space-y-4 list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="flex justify-between items-center gap-5 text-sm m-2"
            >
              {recipe.name}
              <button className="bg-slate-600 text-sm  hover:cursor-pointer px-4 py-1 rounded hover:bg-slate-500 hover:text-white">
                <Link href={`/recipes/${recipe.id}`}>See details</Link>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default Page;
