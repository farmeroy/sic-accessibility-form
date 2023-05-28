import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();
  console.log({ res });
  const [name, email, message, results] = res;

  return new Response(res, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
