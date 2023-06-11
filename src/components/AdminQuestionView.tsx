import AdminDatabaseItemEditRow from "@/components/AdminDatabaseItemEditRow";

const AdminQuestionView = ({ item }) => {
  const updateDatabaseItem = async (data: {
    uuid: string;
    content?: string;
    label?: string;
  }) => {
    try {
      console.log();
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
          onConfirmUpdate={() =>
            updateDatabaseItem({
              uuid: item.uuid,
              label: item.label,
            })
          }
        />
        <AdminDatabaseItemEditRow
          label="Question Content"
          onConfirmUpdate={() =>
            updateDatabaseItem({
              uuid: item.uuid,
              content: item.content,
            })
          }
          content={item.content}
        />
        <hr />
      </li>
    </ol>
  );
};

export default AdminQuestionView;
