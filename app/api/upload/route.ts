import { NextResponse } from "next/server";
import { minioApiService } from "../../../lib/minio/minio-services";
import prisma from "../../../lib/prisma";

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const recipeId = formData.get("recipeId") as string;

  if (recipeId === "undefined") {
    return NextResponse.json(
      { message: "RecipeId is not provided" },
      { status: 500 }
    );
  }

  if (!file) {
    return NextResponse.json(
      { message: "File is not provided" },
      { status: 400 }
    );
  }

  try {
    const { key, url } = await minioApiService.uploadFile(file);

    const image = await prisma.recipeImages.create({
      data: {
        key,
        recipeId,
      },
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      data: { key, url, image },
    });
  } catch (e) {
    return NextResponse.json({ message: e, success: false }, { status: 500 });
  }
};
