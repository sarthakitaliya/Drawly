import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authOption } from "../[...nextauth]/option";

export async function POST(req: Request) {
const session = await getServerSession(authOption);
const token = session?.user?.token;
// console.log(session);

  if (!token) {
    return NextResponse.json({message: "Token missing"}, { status: 400 });
  }

  (await cookies()).set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'lax'
  });

  return NextResponse.json({message:"Token set"}, { status: 200 });
}