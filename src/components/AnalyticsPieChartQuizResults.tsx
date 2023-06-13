"use-client";

import { Pie, PieChart, ResponsiveContainer } from "recharts";

const AnalyticsPieCartQuizResults = ({ quizResults }) => {
  const sectionResults = quizResults.map((quiz) =>
    quiz.results.map((section) => ({
      score: section?.sectionScore,
      title: section?.title,
    }))
  );
  console.log("processed:", { ...sectionResults });
  return <div />;
  // return (
  //   <ResponsiveContainer className="w-full bg-offWhite">
  //     <PieChart className="w-full">
  //       <Pie
  //         data={sectionResults}
  //         nameKey="title"
  //         dataKey="score"
  //         cx="50%"
  //         cy="50%"
  //         outerRadius={50}
  //         fill="#8884d8"
  //       />
  //     </PieChart>
  //   </ResponsiveContainer>
  // );
};

export default AnalyticsPieCartQuizResults;
