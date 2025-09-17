"use client";

import Image from "next/image";
import Link from "next/link";
import RecipeInfoBar from "../RecipeInfobar/RecipeInfobar";

interface SearchRecipesListProps {
  recipes: any[];
}

const RecipeList = ({ recipes }: SearchRecipesListProps) => {
  return (
    <>
      <div className="flex flex-col">
        {recipes.length === 0 ? (
          <>
            <div className="flex items-center justify-center min-h-screen w-full h-full text-slate-400">
              <h1>Not found any Recipes</h1>
            </div>
          </>
        ) : (
          recipes.map((recipe) => (
            <Link
              href={`recipes/${recipe.id}`}
              key={recipe.id}
              className="flex flex-col p-2 justify-between items-center gap-5 text-sm"
            >
              <div className="relative overflow-hidden aspect-video w-full">
                <div className="absolute w-full h-full z-3 bg-black/30"></div>
                <Image
                  alt="recipe"
                  src={recipe.imageUrl || ""}
                  quality={50}
                  fill
                  className="rounded-md object-contain"
                />
                <div className="w-full flex px-4 items-center justify-between text-white font-bold absolute z-4 bottom-5 left-0">
                  <h1 className="truncate">{recipe.name}</h1>
                  <RecipeInfoBar recipeId={recipe.id} />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default RecipeList;
