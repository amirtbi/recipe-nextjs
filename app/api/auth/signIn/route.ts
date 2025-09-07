import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { password, email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    console.log("user", user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 500 });
    }

    const passwordVerified = await bcrypt.compare(password, user.password);

    if (!passwordVerified) {
      return NextResponse.json(
        { message: "Authorization failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Logged in successfully", data: user });
  } catch (e) {
    return NextResponse.json(
      { message: "Logged in successfully" },
      { status: 500 }
    );
  }
}
