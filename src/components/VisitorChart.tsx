"use client";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function processDataForPreviousWeek(
  visitors,
  completedQuizzes,
  contactSubmitted
) {
  const currentDate = new Date();
  const startDateOfPreviousWeek = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  const processedData = [];

  for (let i = 0; i <= 7; i++) {
    const currentDate = new Date(
      startDateOfPreviousWeek.getTime() + i * 24 * 60 * 60 * 1000
    );
    const formattedDate = currentDate.toISOString().slice(0, 10);

    const visitorsCount = visitors.filter((entry) =>
      entry.date.startsWith(formattedDate)
    ).length;
    const completedQuizzesCount = completedQuizzes.filter(
      (entry) => entry.date.slice(0, 10) === formattedDate
    ).length;
    const contactSubmittedCount = contactSubmitted.filter(
      (entry) => entry.date.slice(0, 10) === formattedDate
    ).length;

    processedData.push({
      date: formattedDate,
      visitors: visitorsCount,
      completedQuizzes: completedQuizzesCount,
      contactSubmitted: contactSubmittedCount,
    });
  }

  return processedData;
}

const VisitorChart = ({ visits, quizResults, contacts }) => {
  const processedData = processDataForPreviousWeek(
    visits,
    quizResults,
    contacts
  );

  return (
    <ResponsiveContainer className="w-full bg-offWhite ">
      <LineChart
        data={processedData}
        margin={{ top: 10, right: 30, left: -20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="visitors" stroke="red" />
        <Line type="linear" dataKey="completedQuizzes" stroke="black" />
        <Line type="linear" dataKey="contactSubmitted" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default VisitorChart;
