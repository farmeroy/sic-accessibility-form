import { useEffect } from "react";
import { sections } from "./lib/list-config.json";
import QuizItems from "./components/QuizItems";

function App() {
  useEffect(() => {
    // we will store the values of each
    // checkbox in local storage to access
    // them at the end of the quiz
    for (const section of sections) {
      if (!localStorage.getItem(section.title)) {
        localStorage.setItem(section.title, "[]");
      }
    }
    return () => {
      // remove all local storage items on reload
      for (const section of sections) {
        localStorage.removeItem(section.title);
      }
    };
  });

  return (
    <div className="p-4 mx-auto max-h-vh bg-brandOrange">
      <div className="flex items-center justify-center w-full p-6 bg-brandOrange">
        <h1 className="text-5xl text-black uppercase ">
          Calculate your accessibility score
        </h1>
      </div>
      <div className="max-w-4xl mx-auto">
        <QuizItems sections={sections} />
      </div>
    </div>
  );
}

export default App;
