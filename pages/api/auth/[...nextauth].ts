import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.NODEMAILER_HOST,
        service: process.env.NODEMAILER_SERVICE,
        port: Number(process.env.NODEMAILER_PORT),
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      },
      from: process.env.NODEMAILER_EMAIL,

      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const user = await prisma.user.findFirst({ where: { email } });
        console.log({ user });
        if (user) {
          const transport = createTransport(server);
          const { host } = new URL(url);
          const result = await transport.sendMail({
            to: email,
            from,
            subject: "Sign in to admin page",
            text: `Sign in to the quiz admin page ${host}\n${url}\n\n`,
          });
          const failed = result.rejected.concat(result.pending).filter(Boolean);
          if (failed.length) {
            throw new Error(
              `Email(s) (${failed.join(", ")}) could not be sent`
            );
          }
        } else {
          console.warn(`Person with email ${email} failed to sign in to admin`);
        }
      },
    }),
  ],
  // ...add more providers here
};

export default NextAuth(authOptions);
