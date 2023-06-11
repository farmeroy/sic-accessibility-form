import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { results } = await req.json();
  try {
    const data = await prisma.completedQuiz.create({
      data: {
        results,
      },
    });
    return NextResponse.json({ data });
  } catch (e) {
    console.error({ e });
  }
}
