import DigitalAccessibility from "./DigitalAccessibility";
import CultureAccessibility from "./CultureAccessibility";
import FinalScore from "./FinalScore";
import PhysicalAccessibility from "./PhysicalAccessibility";
import { useState } from "react";

const QuizItems = ({ sections }) => {
  const [physical, digital, culture] = sections;
  const [section, setSection] = useState(1);
  const handleNext = () => setSection((state) => (state += 1));
  const handlePrevious = () => setSection((state) => (state -= 1));

  return (
    <div className="p-6 border rounded-2xl border-1 bg-offWhite">
      {section == 1 ? (
        <PhysicalAccessibility handleNext={handleNext} data={physical} />
      ) : null}
      {section == 2 ? (
        <DigitalAccessibility
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          data={digital}
        />
      ) : null}
      {section == 3 ? (
        <CultureAccessibility
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          data={culture}
        />
      ) : null}
      {section == 4 ? (
        <FinalScore sections={[physical.title, digital.title, culture.title]} />
      ) : null}
    </div>
  );
};

export default QuizItems;
