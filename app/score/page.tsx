import FinalScore from "../../src/components/FinalScore";
import { sections } from "../../src/lib/list-config.json";

const ScorePage = () => {
  return <FinalScore sections={sections} />;
};

export default ScorePage;
