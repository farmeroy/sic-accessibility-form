import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { results } = await req.json();

  let score = 0;
  let totalQuestions = 0;

  // calculate the result here
  results.forEach((section) => {
    let sectionScore = 0;
    section.items.forEach((item) => {
      totalQuestions++;
      if (item.checked == true) {
        score++;
        sectionScore++;
      }
    });
    section.sectionScore = sectionScore;
  });

  results.push({ score });

  try {
    const data = await prisma.completedQuiz.create({
      data: {
        results,
      },
    });
    // return just the score or the whole object?
    return NextResponse.json({ score });
  } catch (e) {
    console.error({ e });
  }
}

export async function GET() {
  try {
    const data = await prisma.completedQuiz.findMany({
      select: {
        uuid: true,
        date: true,
        results: true,
      },
    });
    return NextResponse.json({ data });
  } catch (error) {
    console.error({ error });
  }
}
