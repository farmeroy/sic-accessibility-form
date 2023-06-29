"use client";
import AdminQuestionView from "@/components/AdminQuestionView";
import { ISection } from "src/interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const getQuizData = async () => {
  const res = await fetch("http://localhost:3000/api/questions", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch quiz");
  return res.json();
};

const AdminView = async () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log({ status });
    // this is always redirecting
    if (status === "unauthenticated") router.replace("/admin");
    if (status === "authenticated") router.replace("/admin/questions");
    if (!session) router.replace("/admin");
  }, [status, router, session]);

  if (status === "loading") return <div>loading</div>;

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

export default AdminView;
