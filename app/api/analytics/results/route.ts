import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { results } = await req.json();

  let score = 0;
  const answers = [];

  // calculate the result here
  results.forEach((section) => {
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

  // results.push({ score });
  // results.forEach((section) =>
  //   section.items.forEach((item) => {
  //     answers.push({
  //       question: item.uuid,
  //       answer: item.checked,
  //     });
  //   })
  // );
  // console.log({ answers });

  try {
    const quizResults = await prisma.quizResults.create({
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
    return NextResponse.json({ score });
  } catch (error) {
    console.error({ error });
  }

  // try {
  //   const data = await prisma.completedQuiz.create({
  //     data: {
  //       results,
  //     },
  //   });
  //   // return just the score or the whole object?
  //   return NextResponse.json({ score });
  // } catch (e) {
  //   console.error({ e });
  // }
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
