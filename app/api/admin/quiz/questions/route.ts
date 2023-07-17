import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { authOptions } from "@/lib/authOptions";

interface UpdateQuestionArgs {
  uuid: string;
  content: string;
  label: string;
}

export async function PUT(req: NextRequest) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({ status: "404" });
  const { uuid, content, label }: UpdateQuestionArgs = await req.json();

  try {
    const data = await prisma.quizSectionItem.update({
      where: { uuid },
      data: {
        ...(label && { label: label.trim() }),
        ...(content && { content: content.trim() }),
      },
    });
    revalidateTag("questions");
    return NextResponse.json({ data });
  } catch (e) {
    console.error({ e });
  }
}
