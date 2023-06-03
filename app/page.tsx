import { quizSections } from "../src/lib/list-config.json";
import MainView from "../src/components/MainView";
import { ListItem } from "../src/components/CheckList";

export interface ISection {
  title: string;
  items: ListItem[];
}

function App() {
  return <MainView quizSections={quizSections} />;
}

export default App;
