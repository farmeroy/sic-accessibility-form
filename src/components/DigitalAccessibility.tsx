import CheckList, { ListItem } from "./CheckList";
interface DigitalAccessibilityProps {
  data: { title: string; items: ListItem[] };
  handleNext: () => void;
  handlePrevious: () => void;
}

const DigitalAccessibility = ({
  data,
  handleNext,
  handlePrevious,
}: DigitalAccessibilityProps) => {
  return (
    <>
      <CheckList section="SECTION 2" title={data.title} items={data.items} />
      <div className="flex">
        <button
          onClick={handlePrevious}
          className="p-2 border border-black rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="p-2 border border-black rounded-lg"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default DigitalAccessibility;
