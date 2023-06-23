"use client";

import { useState, useEffect } from "react";
import { results } from "../lib/results.json";

import ContactForm from "./ContactForm";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ISection } from "src/interfaces";

interface FinalScoreProps {
  quizScore: number;
  quizSections: ISection[];
}

const FinalScore = ({ quizScore, quizSections }: FinalScoreProps) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const result = [...results]
    // make sure the result values are ordered least to greatest
    .sort((a, b) => a.maxValue - b.maxValue)
    .find((item) => quizScore <= item.maxValue);

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
      <div className="md:flex bg-offWhite rounded-xl">
        <div
          id="results"
          className="flex-col p-8 text-center rounded-t-xl md:rounded-tr-none md:rounded-tl-xl md:rounded-br-xl text-offWhite h-fit bg-accentBlue"
        >
          <p className="text-2xl">Our accessibility score is</p>
          <p className="text-6xl">{quizScore}</p>
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
              quizSections={quizSections}
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
            <h2 className="text-3xl text-accentBlue">
              Thanks for getting in touch
            </h2>
            <p>
              A member of the SIC team will be in touch within 5 working days.
            </p>
            <p>
              Ready to continue your journey? Check out the SIC website{" "}
              <a
                className="underline text-accentBlue"
                href="https://sicofficial.co.uk/"
              >
                sicofficial.co.uk
              </a>{" "}
              and make sure to follow us on{" "}
              <a
                className="underline text-accentBlue"
                href="https://www.linkedin.com/company/sic-official/"
              >
                LinkedIn
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalScore;
