"use client";

import CheckList, { ListItem } from "./CheckList";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PageContext } from "../lib/QuizContext";
interface PanelProps {
  data: { title: string; items: ListItem[] };
  nextTarget?: string;
  previousTarget?: string;
  sectionNumber: string;
  nextButtonLabel?: string | null;
  previousButtonLabel?: string | null;
}
const Panel = ({
  data,
  nextTarget = "",
  previousTarget = "",
  sectionNumber,
  nextButtonLabel = "Next",
  previousButtonLabel = "Previous",
}: PanelProps) => {
  const router = useRouter();
  const page = useContext(PageContext);

  useEffect(() => {
    scrollTo({ top: 10, behavior: "smooth" });
  }, []);

  const handlePrevious = () => {
    router.replace(`quiz/${previousTarget}`);
  };

  const handleNext = () => {
    router.push(`quiz/${nextTarget}`);
    page.page = nextTarget;
  };

  return (
    <div className="p-6">
      <CheckList
        section={sectionNumber}
        title={data.title}
        items={data.items}
      />
      <div className="flex justify-between w-full py-2">
        {previousTarget ? (
          <button
            onClick={handlePrevious}
            className="w-full p-2 mx-2 text-xl text-black border border-black rounded-lg bg-offWhite"
          >
            {previousButtonLabel}
          </button>
        ) : null}
        {nextTarget ? (
          <button
            onClick={handleNext}
            className="w-full p-2 mx-2 text-xl text-white border border-black rounded-lg bg-accentBlue"
          >
            {nextButtonLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Panel;
