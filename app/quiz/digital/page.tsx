"use client";

import Panel from "../../../src/components/Panel";
import { useContext } from "react";
import { QuestionsContext } from "../../../src/lib/QuizContext";

const DigitalAccessibility = () => {
  const sections = useContext(QuestionsContext);

  return (
    <Panel
      data={sections[1]}
      nextTarget="culture"
      previousTarget="physical"
      nextButtonLabel="Next"
      sectionNumber="Section 2"
    />
  );
};

export default DigitalAccessibility;
