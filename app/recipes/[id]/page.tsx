import Skeleton from "@/_components/Skeleton/Skeleton";
import Title from "@/_components/Title/Title";
import prisma from "@/../lib/prisma";
import { Suspense } from "react";

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const id = await params.id;
  const recipe = await prisma.recipe.findUnique({
    where: { id: id },
  });

  const ingredients = [];

  if (recipe?.ingredients) {
    const items = JSON.parse(recipe.ingredients);
    ingredients.push(...items);
  }
  return (
    <Suspense fallback={<Skeleton />}>
      <Title>Recipe Detail</Title>
      <div className="flex justify-center flex-col w-full items-center bg-slate-500 shadow-md">
        <div className="flex flex-col gap-10 w-full">
          <h2 className="bg-pink-500 text-white p-2">
            {recipe?.name} - Prepration Time:{recipe?.prepTime}
          </h2>
          <div className="p-3">
            <h3>Ingredients:</h3>
            {ingredients?.map((ing) => (
              <li className="px-3" key={ing.name}>
                {ing.name} - {ing.amount}
                <small>({ing.unit})</small>
              </li>
            ))}
            {
              <div>
                <h4>Instruction:</h4>
                <p className="p-3">{recipe?.instructions}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </Suspense>
  );
}
