"use client";

import { useState, useEffect } from "react";
import { results } from "../lib/results.json";
// import { PageContext } from "../lib/QuizContext";

import { ISection } from "../../app/page";
import ContactForm from "./ContactForm";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Confetti from "react-confetti";

interface FinalScoreProps {
  sections: ISection[];
}

const FinalScore = ({ sections }: FinalScoreProps) => {
  const [finalScore, setFinalScore] = useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // currently not using the context
  // const page = useContext(PageContext);
  // page.page = "score";

  const result = results
    // make sure the result values are ordered least to greatest
    .sort((a, b) => a.maxValue - b.maxValue)
    .find((item) => finalScore <= item.maxValue);

  useEffect(() => {
    // iterate over the quiz sections and tally up results
    let score = 0;
    sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.checked == true) score++;
      });
    });
    setFinalScore(score);
  }, [sections]);

  useEffect(() => {
    // https://stackoverflow.com/questions/68932621/put-a-warning-if-page-refresh-in-reactjs
    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    if (isFormSubmitted) {
      // remove any previously added event listener so we don't
      // the user from leaving the page
      window.removeEventListener("beforeunload", unloadCallback);
    } else {
      // warn the user before navigation away from the page
      window.addEventListener("beforeunload", unloadCallback);
    }
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [isFormSubmitted]);

  return (
    <div className="w-full bg-offWhite rounded-xl">
      {isFormSubmitted ? (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      ) : null}
      <div className="md:flex bg-offWhite rounded-xl">
        <div
          id="results"
          className="flex-col p-8 text-center rounded-t-xl md:rounded-tr-none md:rounded-tl-xl md:rounded-br-xl text-offWhite h-fit bg-accentBlue"
        >
          <p className="text-2xl">Our accessibility score is</p>
          <p className="text-6xl">{finalScore}</p>
        </div>
        <div className="p-6 text-xl bg-offWhite rounded-xl">
          <ReactMarkdown>{result?.description ?? ""}</ReactMarkdown>
        </div>
      </div>
      <div className="p-6 bg-offWhite rounded-xl">
        <div>
          <h1 className="text-4xl uppercase text-accentBlue">
            Your Next Steps
          </h1>
          <ReactMarkdown
            components={{
              ul: ({ node, ...props }) => (
                <ul className="p-6 text-xl list-disc" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a className="underline text-accentBlue" {...props} />
              ),
            }}
          >
            {result?.nextSteps ?? ""}
          </ReactMarkdown>
        </div>
        {showContactForm ? (
          <div className="p-2">
            <ContactForm
              sections={sections}
              onFormSubmitted={() => {
                setIsFormSubmitted(true);
                setShowContactForm(false);
              }}
            />
            <button
              className="w-full p-2 text-xl border border-black rounded-lg"
              onClick={() => setShowContactForm(false)}
            >
              Cancel
            </button>
          </div>
        ) : !isFormSubmitted ? (
          <button
            className="w-full p-2 mx-2 text-xl text-white border border-black rounded-lg bg-accentBlue"
            type="button"
            onClick={() => setShowContactForm(true)}
          >
            Contact us
          </button>
        ) : (
          <div className="p-2 text-xl">
            <h2 className="text-2xl text-accentBlue">
              Thank you for completing our quiz!
            </h2>
            <p>
              We'll be getting in touch with you to discuss the next steps. In
              the meantime, have a look at our{" "}
              <a
                className="underline text-accentBlue"
                href="https://sicofficial.co.uk/"
              >
                homepage{" "}
              </a>{" "}
              for more resources{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalScore;
