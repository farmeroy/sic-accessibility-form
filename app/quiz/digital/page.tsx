"use client";

import { useRouter } from "next/navigation";
import Panel from "../../../src/components/Panel";
import { useContext } from "react";
import { QuizContext } from "../../../src/lib/QuizContext";

const DigitalAccessibility = () => {
  const router = useRouter();
  const sections = useContext(QuizContext);
  const handleNext = () => {
    router.push("/quiz/culture");
  };
  return (
    <Panel
      data={sections[1]}
      handleNext={handleNext}
      handlePrevious={() => router.replace("quiz/physical")}
      nextButtonLabel="Next"
      sectionNumber="Section 2"
    />
  );
};

export default DigitalAccessibility;
