"use client";
import { ListItem } from "./CheckList";
import { useState } from "react";

interface CheckBoxProps {
  item: ListItem;
}

const CheckBox = ({ item }: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(item.checked);
  const handleChange = (item: ListItem) => {
    item.checked = !item.checked;
    setIsChecked(item.checked);
  };
  return (
    <div className="flex items-center p-2">
      <input
        onChange={() => handleChange(item)}
        className="w-12 h-12 rounded-md text-accentBlue focus:ring-2 focus:ring-brandOrange"
        type="checkbox"
        name={item.label}
        id={item.label}
        value={item.label}
        checked={isChecked}
      />
      <label className="p-2 mx-2 text-lg" htmlFor={item.label}>
        {item.content}
      </label>
    </div>
  );
};

export default CheckBox;
