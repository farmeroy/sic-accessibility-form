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
    <div className="">
      <div className="h=0 flex-grow overflow-y-auto ">
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
