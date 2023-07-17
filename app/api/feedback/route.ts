import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.quizFeedback.findMany({
      select: {
        maxValue: true,
        description: true,
        nextSteps: true,
      },
    });
    return NextResponse.json({ data });
  } catch (error) {
    console.error({ error });
  }
}
