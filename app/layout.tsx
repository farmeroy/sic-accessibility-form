import type { Metadata } from "next";
import "../styles/globals.css";

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
      <body className="p-2 bg-brandOrange">{children}</body>
    </html>
  );
}
