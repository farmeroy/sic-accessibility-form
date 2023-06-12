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

export async function GET() {
  try {
    const data = await prisma.contactSubmitted.findMany({
      select: {
        uuid: true,
        date: true,
      },
    });
    return NextResponse.json({ data });
  } catch (error) {
    console.error({ error });
  }
}
