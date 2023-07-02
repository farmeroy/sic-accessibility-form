import AdminQuestionView from "@/components/AdminQuestionView";
import { ISection } from "src/interfaces";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import UnauthorizedRedirect from "@/components/UnauthorizedRedirect";

const getQuizData = async () => {
  const res = await fetch("http://localhost:3000/api/questions", {
    next: { tags: ["questions"] },
  });
  if (!res.ok) throw new Error("Failed to fetch quiz");
  return res.json();
};

const AdminQuizItemsView = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return <UnauthorizedRedirect />;

  const quizSections: ISection[] = await getQuizData().then(
    (result) => result.data
  );

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

export default AdminQuizItemsView;
