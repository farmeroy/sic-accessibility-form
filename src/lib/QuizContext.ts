import { createContext } from "react";
import sections from "./list-config.json";

export const QuestionsContext = createContext([...sections.sections]);

export const PageContext = createContext({
  page: "physical",
});
