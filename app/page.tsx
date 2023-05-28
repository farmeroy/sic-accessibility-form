"use client";
import { useEffect } from "react";

import App from "../src/App";

export default function Page() {
  useEffect(() => {
    localStorage.removeItem("SICQuiz");
  });

  return <App />;
}
