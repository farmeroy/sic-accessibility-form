"use client";

import {
  Bar,
  Label,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ListItem {
  content: string;
  label: string;
  Answer: { answer: boolean }[];
}

interface ISection {
  title: string;
  items: ListItem[];
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-1 border bg-offWhite border-1">
        <p>
          <span className="font-bold">label</span> : {label}
        </p>
        <p>
          <span className="font-bold">content: </span>
          {payload[0].payload.content}
        </p>
        <p className="text-accentBlue">
          <span className="font-bold">answered true: </span>
          {payload[0].payload.true}
        </p>
        <p className="text-accentOrange">
          <span className="font-bold">answered false: </span>
          {payload[0].payload.false}
        </p>
      </div>
    );
  }
  return <div />;
};

const AnalyticsPieCartQuizResults = ({
  quizResult,
}: {
  quizResult: ISection[];
}) => {
  const processedAnswers = quizResult.flatMap((section) => ({
    title: section.title,
    answers: section.items.flatMap((item) => ({
      label: item.label,
      content: item.content,
      true: item.Answer.filter((answer) => answer.answer == true).length,
      false: item.Answer.filter((answer) => answer.answer == false).length,
    })),
  }));

  return (
    <div className="flex flex-wrap md:flex-nowrap mx-w-lg">
      {processedAnswers.map((section) => (
        <>
          <ResponsiveContainer key={section.title} height={400}>
            <BarChart data={section.answers}>
              <Tooltip
                content={({ active, payload, label }) => (
                  <CustomTooltip
                    active={active}
                    payload={payload}
                    label={label}
                  />
                )}
              />
              <Bar dataKey="true" fill="#080FA0" />
              <Bar dataKey="false" fill="#FF6721" />
              <XAxis tick={false} dataKey="label">
                <Label className="font-bold" value={section.title} />
              </XAxis>
              <YAxis />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </>
      ))}
    </div>
  );
};

export default AnalyticsPieCartQuizResults;
