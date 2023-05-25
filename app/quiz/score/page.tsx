"use client";

import FinalScore from "../../../src/components/FinalScore";
import { useContext } from "react";
import { QuizContext } from "../../../src/lib/QuizContext";

const ScorePage = () => {
  const sections = useContext(QuizContext);
  return <FinalScore sections={sections} />;
};

export default ScorePage;
