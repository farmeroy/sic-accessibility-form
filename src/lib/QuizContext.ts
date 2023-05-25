import { createContext } from "react";
import sections from "./list-config.json";

export const QuizContext = createContext([...sections.sections]);
