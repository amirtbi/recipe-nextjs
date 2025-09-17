"use server";

import { revalidatePath } from "next/cache";

export const createRecipe = async (prevState: any, formDate: FormData) => {
  try {
    const userId = formDate.get("userId") as string;
    const category = formDate.get("category") as string;
    const name = formDate.get("name") as string;
    const servings = Number(formDate.get("servings"));
    const prepTime = Number(formDate.get("prepTime"));
    const instructions = formDate.get("instructions") as string;
    const file = formDate.get("recipe-image") as File;

    if (!formDate.values()) {
      return { success: false, message: "Form is not valid" };
    }

    const response = await fetch("http://localhost:3000/api/recipe/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        name,
        servings,
        instructions,
        prepTime,
        category,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: "Form is not valid" };
    }

    if (file) {
      const { data } = responseData;
      const uploadFile = new FormData();
      uploadFile.append("file", file);
      uploadFile.append("recipeId", data.id);

      const uploadResponse = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: uploadFile,
      });

      if (!uploadResponse) {
        console.warn("response failed");
      }
      console.log("uploadResponse", await uploadResponse.json());
    }

    // revalidatePath("/home");

    return { success: true, message: "Recipe created!", data: responseData };
  } catch (e) {
    return { success: false, message: e };
  }
};
