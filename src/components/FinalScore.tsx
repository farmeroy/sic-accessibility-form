"use client";

import { useState, useEffect, useContext } from "react";
import { results } from "../lib/results.json";
import { PageContext } from "../lib/QuizContext";

import { ISection } from "../App";
import ContactForm from "./ContactForm";

interface FinalScoreProps {
  sections: ISection[];
}

const FinalScore = ({ sections }: FinalScoreProps) => {
  const [finalScore, setFinalScore] = useState(0);
  const page = useContext(PageContext);
  page.page = "score";

  const [showContactForm, setShowContactForm] = useState(false);
  useEffect(() => {
    scrollTo({ top: 10, behavior: "smooth" });
  }, []);

  const result = results
    // make sure the result values are ordered least to greatest
    .sort((a, b) => a.maxValue - b.maxValue)
    .find((item) => finalScore <= item.maxValue);

  useEffect(() => {
    let score = 0;
    sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.checked == true) score++;
      });
    });
    setFinalScore(score);
  }, [sections]);

  return (
    <>
      <div className="md:flex ">
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
          <button type="submit">Contact us</button>
        </div>
        {showContactForm ? (
          <div className="p-2">
            <ContactForm sections={sections} />
            <button
              className="w-full p-2 text-xl border border-black rounded-lg"
              onClick={() => setShowContactForm(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="w-full p-2 mx-2 text-xl text-white border border-black rounded-lg bg-accentBlue"
            type="button"
            onClick={() => setShowContactForm(true)}
          >
            Contact us
          </button>
        )}
      </div>
    </>
  );
};

export default FinalScore;
