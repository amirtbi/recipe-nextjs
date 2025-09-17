"use client";

import updateRecipe from "@/recipes/edit/[id]/actions/_updateRecipe.action";
import { useActionState, useEffect } from "react";
import { userDataService } from "../../../services/user-data-service";
import { HeartIcon } from "@heroicons/react/16/solid";
import { useEditable } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface EditRecipeFormProps {
  recipeInfo?: any;
}

const EditRecipeForm = ({ recipeInfo }: EditRecipeFormProps) => {
  const user = userDataService.useStore((state) => state.user);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(updateRecipe, {
    success: false,
    message: "",
  });

  debugger;
  useEffect(() => {
    if (state.success) {
      router.push(`/`);
    }
  }, [state]);

  return (
    <div className="flex justify-center flex-col w-full items-center bg-slate-500 shadow-md p-4 rounded-md">
      <form className="flex flex-col gap-5" action={formAction}>
        <div className="flex flex-col space-y-4 w-full rounded">
          <input type="hidden" name="userId" defaultValue={user.id} />
          <input type="hidden" name="recipeId" defaultValue={recipeInfo.id} />
          <div className="flex flex-col gap-2">
            <label>Name:</label>
            <input
              className="w-full px-4 py-2 border rounded-lg"
              name="name"
              defaultValue={recipeInfo?.name || ""}
              placeholder="recipe name..."
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="">category</label>
            <select value={recipeInfo?.category?.name} name="category">
              <option className="text-slate-500" value="breakfast">
                Breakfast
              </option>
              <option className="text-slate-500" value="lunch">
                Lunch
              </option>
              <option className="text-slate-500" value="dinner">
                Dinner
              </option>
              <option className="text-slate-500" value="snacks">
                Snacks
              </option>
              <option className="text-slate-500" value="dessert">
                Dessert
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label>Prepration Time:</label>
            <input
              className="w-full px-4 py-2 border rounded-lg"
              name="prepTime"
              defaultValue={recipeInfo?.prepTime || ""}
              placeholder="prepration time..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Serving:</label>
            <input
              className="w-full px-4 py-2 border rounded-lg"
              defaultValue={recipeInfo?.servings || ""}
              name="servings"
              placeholder="servings..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Instructions:</label>
            <textarea
              rows={10}
              className="border rounded-lg p-2"
              name="instructions"
              defaultValue={recipeInfo?.instructions || ""}
            />
          </div>
          <div className="flex gap-2">
            <HeartIcon className="size-5 text-red-500" />
            <span>{recipeInfo.likes}</span>&nbsp;Likes
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-sm" htmlFor="">
              Image File :{recipeInfo.key}
            </label>
            <input type="file" name="recipe-image" />
          </div>
        </div>
        <button
          className="rounded-md px-4 py-2 text-sm w-full  text-pink-100 bg-slate-600 hover:cursor-pointer hover:text-pink-200"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "sending..." : "Update Recipe"}
        </button>
      </form>
    </div>
  );
};
export default EditRecipeForm;
