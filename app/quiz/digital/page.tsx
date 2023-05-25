"use client";

import { useRouter } from "next/navigation";
import { sections } from "../../../src/lib/list-config.json";
import Panel from "../../../src/components/Panel";

const DigitalAccessibility = () => {
  const router = useRouter();
  const handleNext = () => {
    router.push("/quiz/culture");
  };
  return (
    <Panel
      data={sections[1]}
      handleNext={handleNext}
      handlePrevious={() => router.replace("quiz/physical")}
      nextButtonLabel="Next"
      sectionNumber="Section 2"
    />
  );
};

export default DigitalAccessibility;
