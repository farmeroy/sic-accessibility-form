"use client";

import Panel from "../../../src/components/Panel";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { QuizContext } from "../../../src/lib/QuizContext";

const CultureAccessibilityPage = () => {
  const router = useRouter();
  const sections = useContext(QuizContext);
  const handlePrevious = () => {
    router.replace("quiz/digital");
  };
  const handleNext = () => {
    router.push("quiz/score");
  };
  return (
    <Panel
      data={sections[2]}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      nextButtonLabel="Get your score"
      sectionNumber="Section 3"
    />
  );
};

export default CultureAccessibilityPage;
