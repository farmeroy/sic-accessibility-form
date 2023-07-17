"use client";
import AdminDatabaseItemEditRow from "@/components/AdminDatabaseItemEditRow";
import { ListItem } from "src/interfaces";
import { useState } from "react";

interface AdminQuestionViewProps {
  item: ListItem;
}

const AdminQuestionView = ({ item }: AdminQuestionViewProps) => {
  const [itemData, setItemData] = useState(item);
  const updateDatabaseItem = async (data: {
    uuid: string;
    content?: string;
    label?: string;
  }) => {
    try {
      const result = await fetch("/api/admin/quiz/questions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });
      result.json().then((response) => {
        if (response.data) {
          setItemData(response.data);
        } else {
          throw new Error();
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ol key={itemData.uuid}>
      <li className="p-2 list-disc">
        <AdminDatabaseItemEditRow
          label="Question Label"
          content={itemData.label}
          uuid={itemData.uuid}
          dataField="label"
          onConfirmUpdate={updateDatabaseItem}
        />
        <AdminDatabaseItemEditRow
          label="Question Content"
          dataField="content"
          uuid={itemData.uuid}
          onConfirmUpdate={updateDatabaseItem}
          content={itemData.content}
        />
        <hr />
      </li>
    </ol>
  );
};

export default AdminQuestionView;
