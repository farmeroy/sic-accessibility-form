import type { Metadata } from "next";
import "../styles/globals.css";
import QuizHeader from "../src/components/QuizHeader";

export const metadata: Metadata = {
  title: "SIC Accessibility Quiz",
  description:
    "Assess your workplace accessibility for disabled and neurodiverse workers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brandOrange">
        <QuizHeader />
        <div className="max-w-4xl p-4 mx-auto">{children}</div>
      </body>
    </html>
  );
}
