"use client";

import { useState, useEffect } from "react";

import ContactForm from "./ContactForm";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ISection } from "src/interfaces";

interface FinalScoreProps {
  quizScore: number;
  quizSections: ISection[];
}

interface IFeedback {
  maxValue: number;
  description: string;
  nextSteps: string;
}

const fetchFeedback = async () => {
  try {
    const response = await fetch(`/api/feedback`);
    return response.json();
  } catch (error) {
    console.error({ error });
  }
};

const FinalScore = ({ quizScore, quizSections }: FinalScoreProps) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [feedback, setFeedback] = useState<null | IFeedback>(null);

  useEffect(() => {
    fetchFeedback()
      .then((response) =>
        response.data
          .sort((a, b) => a.maxValue - b.maxValue)
          .find((item) => quizScore <= item.maxValue)
      )
      .then((result) => setFeedback(result));
  }, [quizScore]);

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

  return feedback ? (
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
          <ReactMarkdown>
            {feedback.description.replace(/\\n/g, "\n")}
          </ReactMarkdown>
        </div>
      </div>
      <div className="p-6 bg-offWhite rounded-xl">
        <div>
          <h1 className="text-4xl uppercase text-accentBlue">
            Your Next Steps
          </h1>
          <ReactMarkdown
            components={{
              ul: ({ ...props }) => (
                <ul className="p-6 text-xl list-disc" {...props} />
              ),
              a: ({ ...props }) => (
                <a className="underline text-accentBlue" {...props} />
              ),
            }}
          >
            {feedback.nextSteps.replace(/\\n/g, "\n")}
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
  ) : (
    <div />
  );
};

export default FinalScore;
