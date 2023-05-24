"use client";

import { useState } from "react";
import Panel from "./Panel";
import { ISection } from "../App";

interface QuizItemsProps {
  sections: ISection[];
  setShowScore: (arg0: boolean) => void;
}

const QuizItems = ({ sections, setShowScore }: QuizItemsProps) => {
  const [physical, digital, culture] = sections;
  const [section, setSection] = useState(1);
  const handleNext = () => setSection((state) => (state += 1));
  const handlePrevious = () => setSection((state) => (state -= 1));

  return (
    <div className="p-6 border rounded-2xl border-1 bg-offWhite">
      {section == 1 ? (
        <Panel
          sectionNumber="SECTION 1"
          handleNext={handleNext}
          data={physical}
        />
      ) : null}
      {section == 2 ? (
        <Panel
          sectionNumber="SECTION 2"
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          data={digital}
        />
      ) : null}
      {section == 3 ? (
        <Panel
          sectionNumber="SECTION 3"
          handleNext={() => setShowScore(true)}
          handlePrevious={handlePrevious}
          nextButtonLabel="Get your score"
          data={culture}
        />
      ) : null}
    </div>
  );
};

export default QuizItems;
