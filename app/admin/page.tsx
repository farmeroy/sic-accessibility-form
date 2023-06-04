"use client";

import { useEffect, useState } from "react";
import { ISection } from "../page";

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
            <ol className="p-4">
              {section.items.map((item) => (
                <ol>
                  <li className="p-2 list-disc">
                    <div className="flex p-2 rounded-lg w-96">
                      <button className="p-1 mx-2 text-xs border border-gray-400 rounded-lg hover:bg-gray-200 ">
                        Edit
                      </button>
                      <h3 className="mr-2 font-bold">Item Label:</h3>
                      <p>"{item.label}"</p>
                    </div>
                    <div className="flex p-2 rounded-lg w-fit">
                      <button className="p-1 mx-2 text-xs border border-gray-400 rounded-lg hover:bg-gray-200 ">
                        Edit
                      </button>
                      <h3 className="mr-2 font-bold">Item Content:</h3>{" "}
                      <p>"{item.content}"</p>
                    </div>
                    <hr />
                  </li>
                </ol>
              ))}
            </ol>
          </details>
        </li>
      ))}
    </ul>
  );
};

export default AdminView;
