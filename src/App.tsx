import { sections } from "./lib/list-config.json";
import MainView from "./components/MainView";
import { ListItem } from "./components/CheckList";

export interface ISection {
  title: string;
  items: ListItem[];
}

function App() {
  return (
    <div className="mx-auto max-h-vh bg-brandOrange">
      <MainView sections={sections} />
    </div>
  );
}

export default App;
