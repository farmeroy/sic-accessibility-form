import { getServerSession } from "next-auth";
import UnauthorizedRedirect from "@/components/UnauthorizedRedirect";
import AdminDatabaseMarkdownEditRow from "@/components/AdminDatabaseMarkdownEditRow";
import { authOptions } from "@/lib/authOptions";

const getQuizFeedback = async () => {
  const res = await fetch(`${process.env.PROCESS_URL}/api/feedback`, {
    next: { tags: ["feedback"] },
  });
  if (!res.ok) throw new Error("Failed to fetch quiz feedback items");
  return res.json();
};

const AdminFeedbackItemsView = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return <UnauthorizedRedirect />;

  const quizFeedback = await getQuizFeedback().then((result) => result.data);

  return (
    <ul className="p-8 list-disc rounded-b-lg rounded-r-lg bg-offWhite">
      {quizFeedback.map((feedback) => (
        <li key={feedback.uuid}>
          <h2>Maximum Score: {feedback.maxValue}</h2>
          <details className="p-2">
            <summary className="hover:cursor-pointer">Feedback Summary</summary>
            <AdminDatabaseMarkdownEditRow content={feedback.description} />
          </details>

          <details className="p-2">
            <summary className="hover:cursor-pointer">Next Steps</summary>
            <AdminDatabaseMarkdownEditRow content={feedback.nextSteps} />
          </details>
          <hr />
        </li>
      ))}
    </ul>
  );
};

export default AdminFeedbackItemsView;
