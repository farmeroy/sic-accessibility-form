"use client";

import { sections } from "../../../src/lib/list-config.json";
import Panel from "../../../src/components/Panel";
import { useRouter } from "next/navigation";

const PhysicalAccessibility = () => {
  const router = useRouter();
  const handleNext = () => {
    router.push("quiz/digital");
  };
  return (
    <Panel
      data={sections[0]}
      handleNext={handleNext}
      nextButtonLabel="Next"
      sectionNumber="Section 1"
    />
  );
};

export default PhysicalAccessibility;
