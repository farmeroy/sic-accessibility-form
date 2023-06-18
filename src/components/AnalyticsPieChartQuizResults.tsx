"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Item {
  content: string;
  label: string;
  checked: boolean;
}

interface Section {
  title: string;
  items: Item[];
}

const AnalyticsPieCartQuizResults = ({ quizResults }) => {
  const data: Section[][] = quizResults.map((results) => results.results);
  function calculateAverageChecked(title: string): number {
    const sections = data.flatMap((arr) =>
      arr.filter((section) => section.title === title)
    );
    const totalChecked = sections.reduce((sum, section) => {
      const checkedItems = section.items.filter((item) => item.checked);
      return sum + checkedItems.length;
    }, 0);

    const averageChecked = totalChecked / sections.length;
    return averageChecked;
  }
  function calculateAverageCheckedPercentage(title: string): number {
    const sections = data.flatMap((arr) =>
      arr.filter((section) => section.title === title)
    );
    const totalItems = sections.reduce(
      (sum, section) => sum + section.items.length,
      0
    );
    const totalChecked = sections.reduce((sum, section) => {
      const checkedItems = section.items.filter((item) => item.checked);
      return sum + checkedItems.length;
    }, 0);

    const averageCheckedPercentage = (totalChecked / totalItems) * 100;
    return averageCheckedPercentage;
  }

  return (
    <>
      <div>
        {JSON.stringify(calculateAverageChecked("Physical Accessibility"))}
      </div>
      <div>
        {JSON.stringify(
          calculateAverageCheckedPercentage("Physical Accessibility")
        )}
        %
      </div>
      <ResponsiveContainer className="w-full max-w-4xl bg-offWhite">
        <BarChart
          data={[
            {
              percentage: calculateAverageCheckedPercentage(
                "Physical Accessibility"
              ),
              name: "Physical",
            },
            {
              percentage: calculateAverageCheckedPercentage(
                "Digital Accessibility"
              ),
              name: "Digital",
            },
            {
              percentage:
                calculateAverageCheckedPercentage("Accessible Culture"),
              name: "Digital",
            },
          ]}
        >
          <Bar dataKey="percentage" fill="orange" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default AnalyticsPieCartQuizResults;
