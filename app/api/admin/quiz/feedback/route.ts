import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
// import { getServerSession } from "next-auth";
// import { authOptions } from "pages/api/auth/[...nextauth]";
// import { revalidateTag } from "next/cache";

interface NewFeedbackArgs {
  maxValue: number;
  description: string;
  nextSteps: string;
}

export async function POST(req: NextRequest) {
  const { maxValue, description, nextSteps }: NewFeedbackArgs =
    await req.json();

  try {
    const data = await prisma.quizFeedback.create({
      data: {
        maxValue,
        description,
        nextSteps,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error({ error });
  }
}
