"use client";

import Panel from "../../../src/components/Panel";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { QuizContext } from "../../../src/lib/QuizContext";

const PhysicalAccessibility = () => {
  const router = useRouter();
  const sections = useContext(QuizContext);
  const handleNext = () => {
    router.push("quiz/digital");
  };
  return (
    <Panel
      data={sections[0]}
      handleNext={handleNext}
      nextButtonLabel="Next"
      sectionNumber="Section 1"
    />
  );
};

export default PhysicalAccessibility;
