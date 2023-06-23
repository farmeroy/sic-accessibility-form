import { useState, useEffect } from "react";
import Panel from "./Panel";
import { ISection } from "../../app/page";

interface QuizItemsProps {
  quizSections: ISection[];
  setShowScore: (arg0: boolean) => void;
  setQuizScore: (arg0: number) => void;
}

const QuizItems = ({
  setQuizScore,
  quizSections,
  setShowScore,
}: QuizItemsProps) => {
  const [physical, digital, culture] = quizSections;
  const [section, setSection] = useState(1);
  const handleNext = () => setSection((state) => (state += 1));
  const handlePrevious = () => setSection((state) => (state -= 1));
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

  const sendResults = async () => {
    const result = await fetch("/api/results", {
      method: "POST",
      body: JSON.stringify({ results: quizSections }),
      headers: { "Content-Type": "application/json" },
    });
    return result.json();
  };

  return (
    <div className="p-6 border rounded-2xl border-1 bg-offWhite">
      {section == 1 ? (
        <Panel
          sectionNumber="SECTION 1"
          handleNext={handleNext}
          data={physical}
        />
      ) : null}
      {section == 2 ? (
        <Panel
          sectionNumber="SECTION 2"
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          data={digital}
        />
      ) : null}
      {section == 3 ? (
        <Panel
          sectionNumber="SECTION 3"
          handleNext={async () => {
            await sendResults().then((result) => {
              setQuizScore(result.score);
              setShowScore(true);
            });
          }}
          handlePrevious={handlePrevious}
          nextButtonLabel="Get your score"
          data={culture}
        />
      ) : null}
    </div>
  );
};

export default QuizItems;
