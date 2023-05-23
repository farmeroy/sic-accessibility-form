import CheckBox from "./CheckBox";

export interface ListItem {
  content: string;
  label: string;
  checked: boolean;
}

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
        {
          // todo: put each input in its own component
          // with state that sources its value from local storage?
          items.map((item, index) => (
            <CheckBox item={item} key={index} />
          ))
        }
      </div>
    </fieldset>
  );
};

export default CheckList;
