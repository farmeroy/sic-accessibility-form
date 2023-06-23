"use client";

import {
  Bar,
  BarChart,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Item {
  content: string;
  label: string;
  Answer: { answer: boolean }[];
}

interface Section {
  title: string;
  items: Item[];
}

const AnalyticsPieCartQuizResults = ({
  quizResults,
}: {
  quizResults: Section[];
}) => {
  const processedAnswers = quizResults.flatMap((section) => ({
    title: section.title,
    answers: section.items.flatMap((item) => ({
      label: item.label,
      content: item.content,
      true: item.Answer.filter((answer) => answer.answer == true).length,
      false: item.Answer.filter((answer) => answer.answer == false).length,
    })),
  }));

  return (
    <div className="flex h-96">
      {processedAnswers.map((section) => (
        <div className="w-full max-w-4xl">
          <h1>{section.title}</h1>
          <ResponsiveContainer key={section.title} className="w-full ">
            <BarChart data={section.answers}>
              <Tooltip
                contentStyle={{
                  zIndex: 3000,
                }}
              />
              <Bar dataKey="true" fill="blue" />
              <Bar dataKey="false" fill="red" />
              <XAxis dataKey="content" />
              <YAxis />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsPieCartQuizResults;
