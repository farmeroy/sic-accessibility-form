"use client";

import { sections } from "../../../src/lib/list-config.json";
import Panel from "../../../src/components/Panel";
import { useRouter } from "next/navigation";

const CultureAccessibilityPage = () => {
  const router = useRouter();
  const handlePrevious = () => {
    router.replace("quiz/digital");
  };
  return (
    <Panel
      data={sections[2]}
      // handleNext={handleNext}
      handlePrevious={handlePrevious}
      nextButtonLabel="Get your score"
      sectionNumber="Section 3"
    />
  );
};

export default CultureAccessibilityPage;
