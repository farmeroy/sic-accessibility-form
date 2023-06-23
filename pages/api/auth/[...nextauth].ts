import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";

export const authOptions = {
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
    }),
  ],
  // ...add more providers here
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
