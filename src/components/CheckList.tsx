import CheckBox from "./CheckBox";
import { ListItem } from "src/interfaces";

interface CheckListProps {
  section: string;
  title: string;
  items: ListItem[];
}

const CheckList = ({ section, title, items }: CheckListProps) => {
  return (
    <fieldset>
      <legend className="text-3xl uppercase text-accentBlue">
        {section}: {title}
      </legend>
      <div className="flex-col">
        {items.map((item, index) => (
          <CheckBox item={item} key={index} />
        ))}
      </div>
    </fieldset>
  );
};

export default CheckList;
