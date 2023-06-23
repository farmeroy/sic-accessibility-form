import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// return all quiz sections and questions
export async function GET() {
  try {
    const data = await prisma.quizSection.findMany({
      select: {
        title: true,
        uuid: true,
        items: {
          select: {
            uuid: true,
            id: true,
            label: true,
            content: true,
            quizSectionId: true,
            checked: true,
          },
        },
      },
    });
    return NextResponse.json({ data });
  } catch (e) {
    console.error({ e });
  }
}
