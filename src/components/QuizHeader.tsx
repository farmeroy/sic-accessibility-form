"use client";

import { useContext, useEffect, useState } from "react";
import { PageContext } from "../lib/QuizContext";

const QuizHeader = () => {
  const page = useContext(PageContext);
  const [header, setHeader] = useState("Calculate your accessibility score");
  useEffect(() => {
    if (page.page == "score") {
      setHeader("Whate your score means");
    }
  }, [page.page, setHeader]);
  return (
    <div className="p-2 bg-accentOrange">
      <div className="flex items-center justify-between max-w-5xl py-2 mx-auto h-fit ">
        <div className="flex w-98">
          <h1 className="text-4xl sm:text-6xl text-offWhite">{header}</h1>
        </div>
        <div className="flex-none w-24 h-24 text-4xl border border-4 rounded-full sm:w-64 sm:h-64 sm:text-8xl bg-brandOrange text-offWhite border-offWhite">
          <div className="flex items-center justify-center w-full h-full">
            <p className="">SIC</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;
