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
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin":
          "https://ephemeral-kelpie-f9ff28.netlify.app",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        Vary: "Origin",
      },
    });
  } catch (e) {
    console.error({ e });
  }
}
