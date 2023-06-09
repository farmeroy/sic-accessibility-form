import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../src/lib/db";

export async function PUT(req: NextRequest) {
  const { ip, geo } = req;
  try {
    await prisma.visitor.create({
      data: {
        metadata: { ip, geo },
      },
    });
    return NextResponse;
  } catch (e) {
    console.error({ e });
  }
}
