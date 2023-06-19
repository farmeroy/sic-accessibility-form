import { quizSections as data } from "../src/lib/list-config.json";
import MainView from "../src/components/MainView";
import { ListItem } from "../src/components/CheckList";
import { useEffect, useState } from "react";

export interface ISection {
  title: string;
  items: ListItem[];
}
const getQuizData = async () => {
  const res = await fetch("http://localhost:3000/api/admin/quiz", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch quiz");
  return res.json();
};

async function App() {
  const quizSections = await getQuizData().then((result) => result.data);
  // const [quizSections, setQuizSections] = useState<null | ISection[]>(null);
  // useEffect(() => {
  //   setQuizSections(data);
  // }, [setQuizSections]);

  const createVisitor = async () => {
    const result = await fetch("/api/analytics/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    return result.json();
  };

  // useEffect(() => {
  //   let ignore = false;
  //   if (!ignore) {
  //     createVisitor();
  //   }
  //   return () => {
  //     ignore = true;
  //   };
  // }, []);

  return <MainView quizSections={quizSections} />;
}

export default App;
