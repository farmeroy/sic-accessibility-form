"use client";

import Panel from "../../../src/components/Panel";
import { useContext } from "react";
import { QuestionsContext } from "../../../src/lib/QuizContext";

const PhysicalAccessibility = () => {
  const sections = useContext(QuestionsContext);
  return (
    <Panel
      data={sections[0]}
      nextTarget="digital"
      nextButtonLabel="Next"
      sectionNumber="Section 1"
    />
  );
};

export default PhysicalAccessibility;
