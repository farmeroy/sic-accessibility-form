import { useState, useEffect } from "react";

const FinalScore = ({ sections }) => {
  const [finalScore, setFinalScore] = useState(0);

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
    </>
  );
};

export default FinalScore;
