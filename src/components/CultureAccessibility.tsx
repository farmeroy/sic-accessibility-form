import { ListItem } from "./CheckList";

import Panel from "./Panel";
interface DigitalAccessibilityProps {
  data: { title: string; items: ListItem[] };
  handleNext: () => void;
  handlePrevious: () => void;
}

const CultureAccessibility = ({
  data,
  handleNext,
  handlePrevious,
}: DigitalAccessibilityProps) => {
  return (
    <Panel
      data={data}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      nextButtonLabel="Get your score"
      sectionNumber="Section 3"
    />
  );
};

export default CultureAccessibility;
