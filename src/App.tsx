import { useEffect } from "react";
import { sections } from "./lib/list-config.json";
import MainView from "./components/MainView";
import { ListItem } from "./components/CheckList";

export interface ISection {
  title: string;
  items: ListItem[];
}

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
      <MainView sections={sections} />
    </div>
  );
}

export default App;
