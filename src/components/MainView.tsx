"use client";
import QuizItems from "./QuizItems";
import { useState, useEffect } from "react";
import FinalScore from "./FinalScore";
import { ISection } from "src/interfaces";

interface MainViewProps {
  quizSections: ISection[];
}

const MainView = ({ quizSections }: MainViewProps) => {
  const [showScore, setShowScore] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const createVisitor = async () => {
    const result = await fetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    return result.json();
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      createVisitor();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div className="p-2 bg-accentOrange">
        <div className="flex items-center justify-between max-w-4xl py-2 mx-auto h-fit ">
          <div className="flex w-98">
            <h1 className="text-4xl sm:text-6xl text-offWhite">
              {showScore
                ? "What does your accessibility score mean?"
                : "Calculate your accessibility score"}
            </h1>
          </div>
          <div className="flex-none w-24 h-24 text-4xl border border-4 rounded-full sm:w-36 sm:h-36 sm:text-6xl bg-brandOrange text-offWhite border-offWhite">
            <div className="flex items-center justify-center w-full h-full">
              <p className="">SIC</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl p-4 mx-auto">
        {showScore ? (
          <FinalScore quizScore={quizScore} quizSections={quizSections} />
        ) : (
          <QuizItems
            setShowScore={setShowScore}
            setQuizScore={setQuizScore}
            quizSections={quizSections}
          />
        )}
      </div>
    </>
  );
};

export default MainView;
