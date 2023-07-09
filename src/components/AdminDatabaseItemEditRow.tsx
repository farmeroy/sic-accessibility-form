"use client";

import ModalWrapper from "./ModalWrapper";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface AdminDatabaseItemEditRowProps {
  label: string;
  content: string;
  onConfirmUpdate: (arg0: {
    uuid: string;
    [dataField: string]: string;
  }) => void;
  uuid: string;
  dataField: string;
}

const AdminDatabaseItemEditRow = ({
  label,
  content,
  onConfirmUpdate,
  uuid,
  dataField,
}: AdminDatabaseItemEditRowProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(content);

  return (
    <div className="flex p-2 rounded-lg ">
      <ModalWrapper
        title={`Edit ${label}`}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() =>
          onConfirmUpdate({
            uuid,
            [dataField]: value,
          })
        }
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
      <ReactMarkdown
        className="w-full max-w-2xl p-2"
        components={{
          a: ({ ...props }) => (
            <a className="underline text-accentBlue" {...props} />
          ),
        }}
      >
        {content.replace(/\\n/g, "\n")}
      </ReactMarkdown>
    </div>
  );
};

export default AdminDatabaseItemEditRow;
