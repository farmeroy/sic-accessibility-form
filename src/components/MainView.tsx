import QuizItems from "./QuizItems";
import { useState } from "react";
import FinalScore from "./FinalScore";
import { ISection } from "../App";

interface MainViewProps {
  sections: ISection[];
}

const MainView = ({ sections }: MainViewProps) => {
  const [showScore, setShowScore] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ sections });
  };

  return (
    <>
      <div className="p-2 bg-accentOrange">
        <div className="flex items-center justify-between max-w-5xl py-2 mx-auto h-fit ">
          <div className="flex w-98">
            <h1 className="text-4xl sm:text-6xl text-offWhite">
              {showScore
                ? "What does your accessibility score mean?"
                : "Calculate your accessibility score"}
            </h1>
          </div>
          <div className="flex-none w-24 h-24 text-4xl border border-4 rounded-full sm:w-64 sm:h-64 sm:text-8xl bg-brandOrange text-offWhite border-offWhite">
            <div className="flex items-center justify-center w-full h-full">
              <p className="">SIC</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl p-4 mx-auto">
        {showScore ? (
          <FinalScore sections={sections} />
        ) : (
          <QuizItems setShowScore={setShowScore} sections={sections} />
        )}
      </div>
    </>
  );
};

export default MainView;
