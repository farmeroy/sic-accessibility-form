import { sections } from "./lib/list-config.json";
import MainView from "./components/MainView";
import { ListItem } from "./components/CheckList";
import { useEffect } from "react";

export interface ISection {
  title: string;
  items: ListItem[];
}

function App() {
  useEffect(() => {
    // https://stackoverflow.com/questions/68932621/put-a-warning-if-page-refresh-in-reactjs
    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  return (
    <div className="mx-auto max-h-vh bg-brandOrange">
      <MainView sections={sections} />
    </div>
  );
}

export default App;
