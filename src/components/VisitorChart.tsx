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
import { useState } from "react";

interface IProcessedData {
  date: string;
  visitors: number;
  quizResultsCount: number;
  contactSubmitted: number;
}

const OLDEST_POSSIBLE_DATE = new Date("2023-07-01");

const getDifferenceInDays = (date1, date2) => {
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDay());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDay());
  return Math.floor((utc2 - utc1) / (24 * 60 * 60 * 1000));
};

function processDataForPreviousWeek(
  visitors,
  quizResults,
  contactSubmitted,
  timeFrameOption
) {
  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getTime() - timeFrameOption * 24 * 60 * 60 * 1000
  );

  const processedData = [] as IProcessedData[];

  for (let i = 0; i <= timeFrameOption; i++) {
    const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    const formattedDate = currentDate.toISOString().slice(0, 10);

    const visitorsCount = visitors.filter((entry) =>
      entry.date.startsWith(formattedDate)
    ).length;
    const quizResultsCount = quizResults.filter(
      (entry) => entry.date.slice(0, 10) === formattedDate
    ).length;
    const contactSubmittedCount = contactSubmitted.filter(
      (entry) => entry.date.slice(0, 10) === formattedDate
    ).length;

    processedData.push({
      date: formattedDate,
      visitors: visitorsCount,
      quizResultsCount: quizResultsCount,
      contactSubmitted: contactSubmittedCount,
    });
  }

  return processedData;
}

const VisitorChart = ({ visits, quizResults, contacts }) => {
  const timeFrameOptions = {
    week: 7,
    month: 30,
    year: 365,
    all_time: getDifferenceInDays(OLDEST_POSSIBLE_DATE, new Date(Date.now())),
  };
  const [timeFrame, setTimeFrame] = useState(timeFrameOptions.week);
  const processedData = processDataForPreviousWeek(
    visits,
    quizResults,
    contacts,
    timeFrame
  );
  return (
    <>
      <label htmlFor="time-frame-select">View visitors for the previous:</label>
      <select
        className="m-2 rounded-lg"
        name="time-frame"
        id="time-frame-select"
        onChange={(evt) => setTimeFrame(Number(evt.target.value))}
      >
        {Object.entries(timeFrameOptions).map(([entry, value]) => (
          <option value={value}>{entry}</option>
        ))}
      </select>
      <ResponsiveContainer className="bg-offWhite" height={400}>
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
          <Line type="linear" dataKey="quizResultsCount" stroke="black" />
          <Line type="linear" dataKey="contactSubmitted" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default VisitorChart;
