import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import nodemailer from "nodemailer";
import { ISection } from "../../../app/page";

const emailIsValid = (email: string) => {
  //https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript#46181
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.trim()
  );
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      name: sender,
      email,
      message,
      results,
    }: {
      name: string;
      email: string;
      message: string;
      results: ISection[];
    } = data;

    if (!emailIsValid(email)) {
      throw new Error("Email address contains error");
    } else if (!sender) {
      throw new Error("Sender's name is missing");
    } else if (!message) {
      throw new Error("Please include a message");
    } else if (!results) {
      throw new Error("Quiz results are missing.");
    }

    let formattedResult;

    try {
      formattedResult = results.map(
        (section) =>
          `<h2>${section.title}</h2>
        <ul>${section.items.map(
          (item) =>
            `<li>Question: ${item.content} <span style="font-weight:bold;${
              item.checked ? "color:black" : "color:red"
            }">Answer: ${item.checked}</span></li>`
        )}</ul>`
      );
    } catch (e) {
      console.error(e);
      console.warn({ results });
      formattedResult =
        "<p style='color:red'>There was an error fetching the results</p>";
    }

    const resultsHTML = `<div>
    <div>
    <h1>From: ${sender} ${email}</h1>
    <h1>Message:</h1>
    <p>${message}</p>
    </div>
    <hr></hr>
    <h1>Quiz Results</h1>
    ${formattedResult}</div>`;

    const transporter = nodemailer.createTransport({
      host: "smtp.mail.yahoo.com",
      service: "yahoo",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
      logger: true,
    });
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.SIC_EMAIL_RECEIVER,
      subject: "Accessibility Form Submission",
      text: message,
      html: resultsHTML,
    });
    console.log("Message sent: %s", info.messageId);

    try {
      await prisma.contactSubmitted.create({
        data: {},
      });
    } catch (e) {
      console.error({ e });
    }

    return new Response("Sent", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error({ error });
    return new Response("There was an error sending your message.", {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const data = await prisma.contactSubmitted.findMany({
      select: {
        uuid: true,
        date: true,
      },
    });
    return NextResponse.json({ data });
  } catch (error) {
    console.error({ error });
  }
}
