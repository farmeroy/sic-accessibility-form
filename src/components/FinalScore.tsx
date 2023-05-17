import { useState, useEffect } from "react";
import { results } from "../lib/results.json";

const FinalScore = ({ sections }) => {
  const [finalScore, setFinalScore] = useState(0);

  const result = results
    .sort((a, b) => a.maxValue - b.maxValue)
    .find((item) => finalScore <= item.maxValue);

  useEffect(() => {
    let score = 0;
    for (const section of sections) {
      const items = JSON.parse(localStorage?.getItem(section) ?? "[]");
      for (const item of items) {
        if (item.checked == true) {
          score++;
        }
      }
    }
    setFinalScore(score);
  }, [sections]);

  return (
    <>
      <h1>What does your accessibility score mean?</h1>
      <div>{finalScore}</div>
      <div>
        <p>{result?.description}</p>
        <div className="p-2">
          <h1>Next Steps</h1>
          <ul className="p-4">
            {result?.nextSteps.map((item, index) => (
              <li className="list-disc" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FinalScore;
