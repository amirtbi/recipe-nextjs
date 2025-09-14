import { minioClient } from "./minio";

class MinioApiService {
  BUCKET = "";
  PUBLIC_URL = "";
  constructor() {
    this.BUCKET = "uploads";
    this.PUBLIC_URL = "http://127.0.0.1:9000";
    this.clientExists();
  }

  private async clientExists() {
    const bucketExists = await minioClient
      .bucketExists(this.BUCKET)
      .catch(() => false);
    if (!bucketExists) {
      await minioClient.makeBucket(this.BUCKET, "us-east-1");
    }
  }

  async uploadFile(file: File) {
    const bytes = await file.arrayBuffer();
    const buffer = await Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;

    await minioClient.putObject(this.BUCKET, fileName, buffer, buffer.length, {
      "Content-Type": file.type,
    });

    const presignedUrl = await minioClient.presignedGetObject(
      this.BUCKET,
      fileName,
      60 * 60
    );

    return { key: fileName, url: presignedUrl };
  }

  async getFile(fileKeyName: string) {
    try {
      const url = await minioClient.presignedGetObject(
        this.BUCKET,
        fileKeyName,
        60 * 60
      );

      return url;
    } catch (e) {
      return false;
    }
  }

  async removeFile(fileKeyName: string) {
    try {
      await minioClient.removeObject(this.BUCKET, fileKeyName);
      return { success: true, message: "File removed successfully" };
    } catch (e: any) {
      return { success: false, message: e.message || "Failed to remove file" };
    }
  }
}

export const minioApiService = new MinioApiService();
