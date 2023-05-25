"use client";

import FinalScore from "../../../src/components/FinalScore";
import { useContext } from "react";
import { QuestionsContext } from "../../../src/lib/QuizContext";

const ScorePage = () => {
  const sections = useContext(QuestionsContext);
  return <FinalScore sections={sections} />;
};

export default ScorePage;
