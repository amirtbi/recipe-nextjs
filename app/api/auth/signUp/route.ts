import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, name, phone } = await req.json();

    if (!password) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 500 }
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const userResponse = await prisma.user.create({
      data: { password: hashPassword, email, name, phone },
    });

    return NextResponse.json({
      message: "User created successfully.",
      data: userResponse,
    });
  } catch (e) {
    NextResponse.json({ message: "Request failed" }, { status: 500 });
  }
}
