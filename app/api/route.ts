import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { ISection } from "../../src/App";

const emailIsValid = (email: string) => {
  //https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript#46181
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.trim()
  );
};
export async function POST(req: NextRequest) {
  try {
    const testAccount = await nodemailer.createTestAccount();

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

    const resultsHTML = `<div>
    <div>
    <h1>Message:</h1>
    <p>${message}</p>
    </div>
    <hr></hr>
    ${results.map(
      (section) =>
        `<h2>${section.title}</h2>
        <ul>${section.items.map(
          (item) =>
            `<li>Quesion: ${item.content} <span style="font-weight:bold;${
              item.checked ? "color:black" : "color:red"
            }">Answer: ${item.checked}</span></li>`
        )}</ul>`
    )}</div>`;

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
    const info = await transporter.sendMail({
      from: `"${sender.trim()}" <${email.trim()}>`,
      to: "kemanicataldo@gmail.com",
      subject: "Accessibility Form Submission",
      text: message,
      html: resultsHTML,
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return new Response("Sent", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return new Response(error.message, {
      status: 500,
    });
  }
}
