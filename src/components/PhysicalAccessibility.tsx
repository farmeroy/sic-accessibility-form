// todo: create the physical accessibility section
// each section should fetch its necessary check list
// When the form is 'submited' it should update
// a global form state (tracking the number of points)
// and then move to the next panel
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
    <>
      <CheckList section="SECTION 1" title={data.title} items={data.items} />
      <div className="flex">
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

export default PhysicalAccessibility;
