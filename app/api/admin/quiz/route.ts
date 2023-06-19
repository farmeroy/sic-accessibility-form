import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/db";

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

// send the quiz results to the server
export async function PUT(req: NextRequest) {
  const { results } = await req.json();
  try {
    const data = await prisma.completedQuiz.create({
      data: {
        results,
      },
    });
    console.log(data);
    return NextResponse;
  } catch (e) {
    console.error(e);
  }
}
