import { useEffect, useState } from "react";
import DigitalAccessibility from "./components/DigitalAccessibility";
import PhysicalAccessibility from "./components/PhysicalAccessibility";
import { sections } from "./lib/list-config.json";
import CultureAccessibility from "./components/CultureAccessibility";
import FinalScore from "./components/FinalScore";

function App() {
  const [physical, digital, culture] = sections;
  const [section, setSection] = useState(1);

  useEffect(() => {
    // we will store the values of each
    // checkbox in local storage to access
    // them at the end of the quiz
    for (const section of sections) {
      console.log({ section });
      if (!localStorage.getItem(section.title)) {
        localStorage.setItem(section.title, "[]");
      }
    }
  });

  const handleNext = () => setSection((state) => (state += 1));
  const handlePrevious = () => setSection((state) => (state -= 1));
  return (
    <div className="p-4 bg-brandOrange">
      <div className="flex w-full p-2">
        <h1 className="mx-auto text-4xl text-black uppercase ">
          Calculate your accessibility score
        </h1>
      </div>
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
          <FinalScore
            sections={[physical.title, digital.title, culture.title]}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
