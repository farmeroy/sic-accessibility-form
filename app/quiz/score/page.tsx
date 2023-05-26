"use client";

import FinalScore from "../../../src/components/FinalScore";
import { useContext, useEffect, useState } from "react";
import { QuestionsContext } from "../../../src/lib/QuizContext";

const ScorePage = () => {
  const [quizResult, setQuizResult] = useState([]);
  const sections = useContext(QuestionsContext);
  useEffect(() => {
    if (localStorage.getItem("SICQuiz")) {
      setQuizResult(JSON.parse(localStorage.getItem("SICQuiz")));
    } else {
      setQuizResult(sections);
      localStorage.setItem("SICQuiz", JSON.stringify(sections));
    }
  }, [sections]);

  return <FinalScore sections={quizResult} />;
};

export default ScorePage;
