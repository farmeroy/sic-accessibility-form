import AnalyticsPieCartQuizResults from "@/components/AnalyticsPieChartQuizResults";
import UnauthorizedRedirect from "@/components/UnauthorizedRedirect";
import VisitorChart from "@/components/VisitorChart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Suspense } from "react";

const getVisits = async () => {
  const res = await fetch(`${process.env.PROCESS_URL}/api/visits`, {
    next: { tags: ["visits"] },
  });
  if (!res.ok) throw new Error("Failed to fetch visits");
  return res.json();
};

const getQuizResults = async () => {
  const res = await fetch(`${process.env.PROCESS_URL}/api/results`, {
    next: { tags: ["results"] },
  });
  if (!res.ok) throw new Error("Failed to fetch quiz results");
  return res.json();
};

const getContacts = async () => {
  const res = await fetch(`${process.env.PROCESS_URL}/api/contacts`, {
    next: { tags: ["contacts"] },
  });
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json();
};

const DashboardView = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return <UnauthorizedRedirect />;

  const visitsData = getVisits().then((result) => result.data);
  const quizResultsData = getQuizResults().then((result) => result.data);
  const contactsData = getContacts().then((result) => result.data);

  const [visits, quizResults, contacts] = await Promise.all([
    visitsData,
    quizResultsData,
    contactsData,
  ]);

  return (
    <div className="p-2 mb-2 rounded-b-lg rounded-r-lg bg-offWhite">
      <div className="p-6 m-4 border border-gray-400 rounded-lg">
        <h2 className="text-center">
          Site Visits vs. Submitted Quizzes vs. Submitted Contact Forms
        </h2>
        <Suspense fallback={<div>Loading visitor data...</div>}>
          <VisitorChart
            visits={visits}
            quizResults={quizResults.quizzes}
            contacts={contacts}
          />
        </Suspense>
      </div>
      <div className="p-6 m-4 border border-gray-400 rounded-lg ">
        <h2 className="p-2 text-center">Quiz Results</h2>
        <Suspense fallback={<div>Loading quiz results data...</div>}>
          <AnalyticsPieCartQuizResults quizResult={quizResults.answers} />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardView;
