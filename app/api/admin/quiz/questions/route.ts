import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../src/lib/db";

export async function PUT(req: NextRequest) {
  const { uuid, content } = await req.json();
  try {
    const data = await prisma.quizSectionItem.update({
      where: { uuid },
      data: {
        content: content,
      },
    });
    return NextResponse.json({ data });
  } catch (e) {
    console.error({ e });
  }
}
