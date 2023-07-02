import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ISection } from "src/interfaces";
import { revalidateTag } from "next/cache";

interface IAnswer {
  quizSectionItemId: string;
  answer: boolean;
}

export async function POST(req: NextRequest) {
  const { results } = await req.json();

  let score = 0;
  const answers: IAnswer[] = [];

  // calculate the result here
  results.forEach((section: ISection) => {
    let sectionScore = 0;
    section.items.forEach((item) => {
      if (item.checked == true) {
        score++;
        sectionScore++;
      }
      answers.push({
        quizSectionItemId: item.id,
        answer: item.checked,
      });
    });
    section.sectionScore = sectionScore;
  });

  try {
    await prisma.quizResult.create({
      data: {
        totalScore: score,
        completeQuiz: results,
        answers: {
          createMany: {
            data: [...answers],
          },
        },
      },
    });
    revalidateTag("contacts");
    return NextResponse.json({ score });
  } catch (error) {
    console.error({ error });
  }
}

// get all the answers for each quiz item
export async function GET() {
  try {
    const answers = await prisma.quizSection.findMany({
      select: {
        title: true,
        items: {
          select: {
            label: true,
            content: true,
            Answer: {
              select: {
                answer: true,
              },
            },
          },
        },
      },
    });
    const quizzes = await prisma.quizResult.findMany({
      select: {
        totalScore: true,
        date: true,
      },
    });
    return NextResponse.json({ data: { answers, quizzes } });
  } catch (error) {
    console.error({ error });
  }
}
