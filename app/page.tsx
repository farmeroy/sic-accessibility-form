import { sections } from "../src/lib/list-config.json";
import MainView from "../src/components/MainView";
import { ListItem } from "../src/components/CheckList";

export interface ISection {
  title: string;
  items: ListItem[];
}

function App() {
  return <MainView sections={sections} />;
}

export default App;
