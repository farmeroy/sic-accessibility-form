export interface ListItem {
  content: string;
  label: string;
}

interface CheckListProps {
  section: string;
  title: string;
  items: ListItem[];
}

const CheckList = ({ section, title, items }: CheckListProps) => {
  const handleChecked = (event) => {
    const items = JSON.parse(localStorage.getItem(title));
    const newItems = [
      ...items.filter((item) => item.title != event.target.value),
    ];
    localStorage.setItem(
      title,
      JSON.stringify([
        ...newItems,
        { title: event.target.value, checked: event.target.checked },
      ])
    );
  };

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
            <div key={index} className="flex items-center p-2">
              <input
                onClick={(event) => handleChecked(event)}
                className="w-12 h-12 rounded-sm text-accentBlue focus:ring-2 focus:ring-brandOrange"
                type="checkbox"
                name={item.label}
                id={item.label}
                value={item.label}
              />
              <label className="p-2 mx-2 text-lg" htmlFor={item.label}>
                {item.content}
              </label>
            </div>
          ))
        }
      </div>
    </fieldset>
  );
};

export default CheckList;
