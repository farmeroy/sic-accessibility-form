"use client";

import CheckList, { ListItem } from "./CheckList";
import { useEffect } from "react";
interface PanelProps {
  data: { title: string; items: ListItem[] };
  handleNext?: () => void | null;
  handlePrevious?: () => void | null;
  sectionNumber: string;
  nextButtonLabel?: string | null;
  previousButtonLabel?: string | null;
}
const Panel = ({
  data,
  handleNext,
  handlePrevious,
  sectionNumber,
  nextButtonLabel = "Next",
  previousButtonLabel = "Previous",
}: PanelProps) => {
  useEffect(() => {
    scrollTo({ top: 10, behavior: "smooth" });
  }, []);

  console.log({ data });
  return (
    <div>
      <CheckList
        section={sectionNumber}
        title={data.title}
        items={data.items}
      />
      <div className="flex justify-between w-full py-2">
        {handlePrevious ? (
          <button
            onClick={handlePrevious}
            className="w-full p-2 mx-2 text-xl text-black border border-black rounded-lg bg-offWhite"
          >
            {previousButtonLabel}
          </button>
        ) : null}
        {handleNext ? (
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
