import AnalyticsPieCartQuizResults from "@/components/AnalyticsPieChartQuizResults";
import VisitorChart from "@/components/VisitorChart";

const getVisits = async () => {
  const res = await fetch("http://localhost:3000/api/visits", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch visits");
  return res.json();
};

const getQuizResults = async () => {
  const res = await fetch("http://localhost:3000/api/results", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch quiz results");
  return res.json();
};

const getContacts = async () => {
  const res = await fetch("http://localhost:3000/api/contacts", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch results");
  return res.json();
};

const DashboardView = async () => {
  const visits = await getVisits().then((result) => result.data);
  const quizResults = await getQuizResults().then((result) => result.data);
  const contacts = await getContacts().then((result) => result.data);

  return (
    <div>
      <h1>Analytics</h1>
      <div className="w-full p-6 h-96 bg-offWhite">
        <h1>Site Visits vs. Submitted Quizzes vs. Submitted Contact Forms</h1>
        <VisitorChart
          visits={visits}
          quizResults={quizResults.quizzes}
          contacts={contacts}
        />
      </div>

      <div className="w-full p-6 h-96 bg-offWhite">
        <AnalyticsPieCartQuizResults quizResults={quizResults.answers} />
      </div>
    </div>
  );
};

export default DashboardView;
