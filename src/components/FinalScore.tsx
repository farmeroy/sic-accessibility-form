import { useState, useEffect } from "react";
import { results } from "../lib/results.json";

const FinalScore = ({ sections }) => {
  const [finalScore, setFinalScore] = useState(0);
  useEffect(() => {
    scrollTo({ top: 10, behavior: "smooth" });
  });

  const result = results
    // make sure the result values are ordered least to greatest
    .sort((a, b) => a.maxValue - b.maxValue)
    .find((item) => finalScore <= item.maxValue);

  useEffect(() => {
    let score = 0;
    for (const section of sections) {
      console.log(section.title);
      const items = JSON.parse(localStorage?.getItem(section.title) ?? "[]");
      for (const item of items) {
        if (item.checked == true) {
          score++;
        }
      }
    }
    setFinalScore(score);
  }, [sections]);

  return (
    <div className="w-full bg-offWhite rounded-xl">
      <div className="md:flex bg-offWhite rounded-xl">
        <div className="flex-col p-8 text-center rounded-t-xl md:rounded-tr-none md:rounded-tl-xl md:rounded-br-xl text-offWhite h-fit bg-accentBlue">
          <p className="text-2xl">Our accessibility score is</p>
          <p className="text-6xl">{finalScore}</p>
        </div>
        <div className="p-6 text-xl bg-offWhite rounded-xl">
          <p>{result?.description}</p>
        </div>
      </div>
      <div className="p-6 bg-offWhite rounded-xl">
        <div>
          <h1 className="text-4xl uppercase text-accentBlue">
            Your Next Steps
          </h1>

          <ul className="p-6 text-xl">
            {result?.nextSteps.map((item, index) => (
              <li className="list-disc" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FinalScore;
