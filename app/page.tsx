"use client";

import { quizSections as data } from "../src/lib/list-config.json";
import MainView from "../src/components/MainView";
import { ListItem } from "../src/components/CheckList";
import { useEffect, useState } from "react";

export interface ISection {
  title: string;
  items: ListItem[];
}

function App() {
  const [quizSections, setQuizSections] = useState<null | ISection[]>(null);
  useEffect(() => {
    setQuizSections(data);
  }, [setQuizSections]);

  return quizSections ? <MainView quizSections={quizSections} /> : <div />;
}

export default App;
