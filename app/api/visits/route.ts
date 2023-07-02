import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const { geo } = req;
  try {
    const data = await prisma.visitor.create({
      data: {
        metadata: { geo },
      },
    });
    revalidateTag("visits");
    return NextResponse.json({ data });
  } catch (e) {
    console.error({ e });
  }
}

export async function GET() {
  try {
    const data = await prisma.visitor.findMany({
      select: {
        date: true,
      },
    });
    return NextResponse.json({ data });
  } catch (error) {
    console.error({ error });
  }
}
