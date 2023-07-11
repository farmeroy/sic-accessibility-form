import AnalyticsPieCartQuizResults from "@/components/AnalyticsPieChartQuizResults";
import UnauthorizedRedirect from "@/components/UnauthorizedRedirect";
import VisitorChart from "@/components/VisitorChart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const getVisits = async () => {
  const res = await fetch("http://localhost:3000/api/visits", {
    next: { tags: ["visits"] },
  });
  if (!res.ok) throw new Error("Failed to fetch visits");
  return res.json();
};

const getQuizResults = async () => {
  const res = await fetch("http://localhost:3000/api/results", {
    next: { tags: ["results"] },
  });
  if (!res.ok) throw new Error("Failed to fetch quiz results");
  return res.json();
};

const getContacts = async () => {
  const res = await fetch("http://localhost:3000/api/contacts", {
    next: { tags: ["contacts"] },
  });
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json();
};

const DashboardView = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return <UnauthorizedRedirect />;

  const visits = await getVisits().then((result) => result.data);
  const quizResults = await getQuizResults().then((result) => result.data);
  const contacts = await getContacts().then((result) => result.data);
  return (
    <div className="p-2 rounded-b-lg rounded-r-lg bg-offWhite">
      <div className="p-6 h-96">
        <h1>Site Visits vs. Submitted Quizzes vs. Submitted Contact Forms</h1>
        <VisitorChart
          visits={visits}
          quizResults={quizResults.quizzes}
          contacts={contacts}
        />
      </div>

      <div className="w-full p-6 bg-offWhite">
        <AnalyticsPieCartQuizResults quizResult={quizResults.answers} />
      </div>
    </div>
  );
};

export default DashboardView;
