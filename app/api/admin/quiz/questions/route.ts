import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../src/lib/db";

interface UpdateQuestionArgs {
  uuid: string;
  content: string;
  label: string;
}

export async function PUT(req: NextRequest) {
  const { uuid, content, label }: UpdateQuestionArgs = await req.json();

  try {
    const data = await prisma.quizSectionItem.update({
      where: { uuid },
      data: {
        ...(label && { label: label }),
        ...(content && { content: content }),
      },
    });
    return NextResponse.json({ data });
  } catch (e) {
    console.error({ e });
  }
}
