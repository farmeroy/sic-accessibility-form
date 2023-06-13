"use client";
import AdminDatabaseItemEditRow from "@/components/AdminDatabaseItemEditRow";

const AdminQuestionView = ({ item }) => {
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
      return result.json();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ol key={item.uuid}>
      <li className="p-2 list-disc">
        <AdminDatabaseItemEditRow
          label="Question Label"
          content={item.label}
          uuid={item.uuid}
          dataField="label"
          onConfirmUpdate={updateDatabaseItem}
        />
        <AdminDatabaseItemEditRow
          label="Question Content"
          dataField="content"
          uuid={item.uuid}
          onConfirmUpdate={updateDatabaseItem}
          content={item.content}
        />
        <hr />
      </li>
    </ol>
  );
};

export default AdminQuestionView;
