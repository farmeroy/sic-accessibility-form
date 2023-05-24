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
      <body>
        {" "}
        <div className="p-2 bg-accentOrange">
          <div className="flex items-center justify-between max-w-5xl py-2 mx-auto h-fit ">
            <div className="flex w-98">
              <h1 className="text-4xl sm:text-6xl text-offWhite">
                Add Title Here
              </h1>
            </div>
            <div className="flex-none w-24 h-24 text-4xl border border-4 rounded-full sm:w-64 sm:h-64 sm:text-8xl bg-brandOrange text-offWhite border-offWhite">
              <div className="flex items-center justify-center w-full h-full">
                <p className="">SIC</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl p-4 mx-auto">{children}</div>
      </body>
    </html>
  );
}
