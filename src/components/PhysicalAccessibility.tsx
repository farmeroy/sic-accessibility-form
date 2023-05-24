import CheckList, { ListItem } from "./CheckList";
interface PhysicalAccessibilityProps {
  data: { title: string; items: ListItem[] };
  handleNext: () => void;
}

const PhysicalAccessibility = ({
  data,
  handleNext,
}: PhysicalAccessibilityProps) => {
  return (
    <div className="">
      <div className="">
        <CheckList section="SECTION 1" title={data.title} items={data.items} />
        <div className="flex">
          <button
            onClick={handleNext}
            className="p-2 border border-black rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhysicalAccessibility;
