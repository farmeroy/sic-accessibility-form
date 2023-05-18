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
    <div className="mx-auto max-h-vh bg-brandOrange">
      <div className="p-2 bg-accentOrange">
        <div className="flex items-center justify-between max-w-5xl py-2 mx-auto h-fit ">
          <div className="flex w-98">
            <h1 className="text-4xl sm:text-6xl text-offWhite">
              Calculate your accessibility score
            </h1>
          </div>
          <div className="flex-none w-24 h-24 text-4xl border border-4 rounded-full sm:w-64 sm:h-64 sm:text-8xl bg-brandOrange text-offWhite border-offWhite">
            <div className="flex items-center justify-center w-full h-full">
              <p className="">SIC</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl p-4 mx-auto">
        <QuizItems sections={sections} />
      </div>
    </div>
  );
}

export default App;
