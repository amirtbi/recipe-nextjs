"use server";
import prisma from "../../../../../lib/prisma";
import { minioApiService } from "../../../../../lib/minio/minio-services";

const updateRecipe = async (prevState: any, formDate: FormData) => {
  const userId = formDate.get("userId") as string;
  const category = formDate.get("category");
  const recipeId = formDate.get("recipeId") as string;
  const name = formDate.get("name") as string | null;
  const servings = Number(formDate.get("servings"));
  const prepTime = Number(formDate.get("prepTime"));
  const instructions = formDate.get("instructions") as string | null;
  const file = formDate.get("recipe-image") as File | null;

  let uploadedFileKey: string | null = null;
  try {
    const updateRecipeDbData = fetch("http://localhost:3000/api/recipe/edit", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId,
        recipeId,
        name,
        servings,
        prepTime,
        instructions,
        category,
      }),
    }).then((res) => res.json());

    let filePromise: Promise<any> | null = null;

    if (file && file.size > 0) {
      const foundFile = await prisma.recipeImages.findUnique({
        where: { recipeId: recipeId },
      });

      if (!foundFile) {
        console.error("current recipe has not image");
      } else {
        const deleteRes = await prisma.recipeImages.delete({
          where: { recipeId },
        });
        if (!deleteRes) {
          return { message: "Recipe not found", success: false };
        }
        const removedResponse = await minioApiService.removeFile(
          foundFile?.key
        );

        if (!removedResponse) {
          return { message: "Removing file failed", success: false };
        }
      }

      const uploadFile = new FormData();
      uploadFile.append("file", file);
      uploadFile.append("recipeId", recipeId);

      filePromise = fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: uploadFile,
      }).then((res) => res.json());
    }

    const [updateData, uploadFilePromise] = await Promise.all([
      updateRecipeDbData,
      filePromise || Promise.resolve(null),
    ]);

    if (!updateData.success) {
      if (uploadedFileKey) {
        await minioApiService.removeFile(uploadedFileKey);
      }

      return { success: false, message: "Recipe update failed" };
    }
    return {
      success: true,
      message: "Recipe updated successfully",
      data: updateData,
      file: uploadFilePromise || null,
    };
  } catch (e) {
    if (uploadedFileKey) {
      await minioApiService.removeFile(uploadedFileKey);
    }
    return { success: false, message: e || "Failed updating recipe" };
  }
};

export default updateRecipe;
