import { NextResponse } from "next/server";
import { api } from "@repo/utils/api";

export async function GET() {
  try {
    const res = await api.get("/documents");
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}