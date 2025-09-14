import Skeleton from "@/_components/Skeleton/Skeleton";
import Title from "@/_components/Title/Title";
import prisma from "@/../lib/prisma";
import { Suspense } from "react";
import { minioApiService } from "../../../lib/minio/minio-services";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const id = await params.id;
  let imageUrl = "";
  const recipe = await prisma.recipe.findUnique({
    where: { id: id },
  });

  const recipeImage = await prisma.recipeImages.findUnique({
    where: { recipeId: id },
  });

  const ingredients = [];

  if (recipeImage?.key) {
    imageUrl = (await minioApiService.getFile(recipeImage?.key)) as string;
  }

  if (recipe?.ingredients) {
    const items = JSON.parse(recipe.ingredients);
    ingredients.push(...items);
  }

  return (
    <Suspense fallback={<Skeleton />}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-slate-500 font-bold py-6">Recipe</h1>
        <Link
          className="bg-slate-500 text-white flex gap-2 rounded px-4 text-sm py-2"
          href={`/recipes/edit/${id}`}
        >
          Edit <PencilIcon className="size-5" />
        </Link>
      </div>
      <div className="flex justify-center flex-col w-full items-center bg-slate-500 shadow-md">
        <div className="flex flex-col w-full">
          <div className="relative w-full aspect-video rounded">
            <Image
              alt="recipe"
              src={imageUrl}
              fill
              className="object-contain"
            />
          </div>
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
