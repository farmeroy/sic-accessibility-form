import { NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/db";

export async function GET() {
  try {
    const data = await prisma.quizSection.findMany({
      select: {
        title: true,
        uuid: true,
        items: {
          select: {
            uuid: true,
            label: true,
            content: true,
          },
        },
      },
    });
    return NextResponse.json({ data });
  } catch (e) {
    console.error({ e });
  }
}
