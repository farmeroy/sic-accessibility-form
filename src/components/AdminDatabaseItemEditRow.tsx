import ModalWrapper from "./ModalWrapper";
import { useState } from "react";

interface AdminDatabaseItemEditRowProps {
  label: string;
  content: string;
  onConfirmUpdate: () => void;
}

const AdminDatabaseItemEditRow = ({
  label,
  content,
  onConfirmUpdate,
}: AdminDatabaseItemEditRowProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(content);

  return (
    <div className="flex p-2 rounded-lg ">
      <ModalWrapper
        title={`Edit ${label}`}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirmUpdate}
      >
        <textarea
          required
          className="w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </ModalWrapper>
      <button
        onClick={() => setIsOpen(true)}
        className="p-1 mx-2 text-xs border border-gray-400 rounded-lg hover:bg-gray-200 "
      >
        Edit
      </button>
      <h3 className="w-48 mr-2 font-bold">{label}:</h3>
      <p className="w-full">"{content}"</p>
    </div>
  );
};

export default AdminDatabaseItemEditRow;
