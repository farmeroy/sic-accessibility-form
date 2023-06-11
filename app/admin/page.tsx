"use client";

import { useEffect, useState } from "react";
import { ISection } from "../page";
import AdminQuestionView from "@/components/AdminQuestionView";

const AdminView = () => {
  const [quizSections, setQuizsections] = useState<null | ISection[]>(null);
  const getQuizData = async () => {
    const result = await fetch("/api/admin/quiz");
    return result.json();
  };

  useEffect(() => {
    let ignore = false;
    getQuizData().then((result) => {
      console.log({ result });
      if (!ignore) {
        setQuizsections(result.data);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  if (!quizSections) return <div />;
  return (
    <ul className="p-6 m-8 list-disc rounded-lg bg-offWhite">
      {quizSections.map((section) => (
        <li key={section.uuid}>
          <h1>{section.title}</h1>
          <details>
            <summary className="hover:cursor-pointer">Section Items:</summary>
            <ol className="w-full p-4">
              {section.items.map((item) => (
                <AdminQuestionView item={item} />
              ))}
            </ol>
          </details>
        </li>
      ))}
    </ul>
  );
};

export default AdminView;
