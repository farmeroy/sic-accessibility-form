import CheckList, { ListItem } from "./CheckList";
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
    <>
      <CheckList section="SECTION 3" title={data.title} items={data.items} />
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
          Get your score
        </button>
      </div>
    </>
  );
};

export default CultureAccessibility;
