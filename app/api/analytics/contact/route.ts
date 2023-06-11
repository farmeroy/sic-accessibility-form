import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST() {
  try {
    const data = await prisma.contactSubmitted.create({
      data: {},
    });
    return NextResponse.json({ data });
  } catch (e) {
    console.error({ e });
  }
}
