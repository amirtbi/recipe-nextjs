"use client";
import Title from "@/_components/Title/Title";
import { createRecipe } from "./_actions/_createRecipe";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { userDataService } from "../../../services/user-data-service";

const NewRecipe = () => {
  const router = useRouter();
  const user = userDataService.useStore((state) => state.user);
  const [state, formAction, isPending] = useActionState(createRecipe, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      return router.push("/");
    }
  }, [state]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl text-slate-500 font-bold py-4">New Recipe</h1>
        <div className="rounded-md bg-slate-400 shadow-md p-4">
          <form action={formAction} className="flex flex-col gap-5">
            <input type="hidden" name="userId" value={user.id} />
            <div className="flex justify-between items-center">
              <label htmlFor="Categories">Categories</label>
              <select name="category">
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
            <div>
              <label htmlFor="name" className="block text-sm mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter recipe name"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="servings" className="block text-sm mb-2">
                Servings
              </label>
              <input
                type="text"
                id="servings"
                name="servings"
                placeholder="Enter recipe servings"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="prepTime" className="block text-sm mb-2">
                Preperation Time
              </label>
              <input
                type="text"
                id="prepTime"
                name="prepTime"
                placeholder="Enter recipe preperation time"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="Instructions" className="block text-sm mb-2">
                Instructions
              </label>
              <textarea
                id="Instructions"
                name="instructions"
                placeholder="Write recipe instructions..."
                rows={6}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="recipeImage" className="block text-sm mb-2">
                Upload file
              </label>
              <input id="recipeImage" type="file" name="recipe-image" />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-md px-4 py-2 text-sm  text-pink-100 bg-slate-600 hover:cursor-pointer hover:text-pink-200"
            >
              {isPending ? "sending..." : "Create Recipe"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewRecipe;
