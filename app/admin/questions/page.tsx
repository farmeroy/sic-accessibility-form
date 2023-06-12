import AdminQuestionView from "@/components/AdminQuestionView";

const getQuizData = async () => {
  const res = await fetch("http://localhost:3000/api/admin/quiz");
  if (!res.ok) throw new Error("Failed to fetch quiz");
  return res.json();
};

const AdminView = async () => {
  const quizSections = await getQuizData().then((result) => result.data);

  return (
    <ul className="p-6 m-8 list-disc rounded-lg bg-offWhite">
      {quizSections.map((section) => (
        <li key={section.uuid}>
          <h1>{section.title}</h1>
          <details>
            <summary className="hover:cursor-pointer">Section Items:</summary>
            <ol className="w-full p-4">
              {section.items.map((item) => (
                <AdminQuestionView item={item} />
              ))}
            </ol>
          </details>
        </li>
      ))}
    </ul>
  );
};

export default AdminView;
