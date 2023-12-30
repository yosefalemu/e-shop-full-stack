import bcrpt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);

  const { firstName, lastName, email, password } = body;
  const hashedPassword = await bcrpt.hash(password, 10);
  const user = await prisma?.user.create({
    data: { firstName, lastName, email, hashedPassword },
  });
  return NextResponse.json(user);
}
