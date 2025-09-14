"use client";
import {
  HeartIcon as HeartIconOutline,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/16/solid";
import { toggleLike } from "@/_toggleLike";
import { useState } from "react";
import Link from "next/link";

interface RecipeInforBarProps {
  recipeId: string;
}

const RecipeInfoBar = ({ recipeId }: RecipeInforBarProps) => {
  const [like, setLike] = useState(false);
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-slate-600/20 rounded-full p-2">
        <Link href={`/recipes/${recipeId}`}>
          <MagnifyingGlassCircleIcon className="size-6 text-orange-400" />
        </Link>
      </div>
      {!like ? (
        <div
          className="bg-slate-600/20 rounded-full p-2"
          onClick={async () => {
            await toggleLike(recipeId, true);
            setLike(true);
          }}
        >
          <HeartIconOutline className="size-6" />
        </div>
      ) : (
        <div
          className="bg-slate-600/20 rounded-full p-2"
          onClick={async () => {
            await toggleLike(recipeId, false);
            setLike(false);
          }}
        >
          <SolidHeartIcon className="size-6 text-red-500" />
        </div>
      )}
    </div>
  );
};

export default RecipeInfoBar;
