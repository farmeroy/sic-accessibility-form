"use client";

import { useContext } from "react";
import Panel from "../../../src/components/Panel";
import { QuestionsContext } from "../../../src/lib/QuizContext";

const CultureAccessibilityPage = () => {
  const sections = useContext(QuestionsContext);

  return (
    <Panel
      nextTarget="score"
      previousTarget="digital"
      data={sections[2]}
      nextButtonLabel="Get your score"
      sectionNumber="Section 3"
    />
  );
};

export default CultureAccessibilityPage;
